'use strict';
(() => {
  const presets={tritium:{name:'Получение трития',parts:{Oxygen:96,Plasma:1}},plasma:{name:'Плазменный огонь · пример 1:1',parts:{Oxygen:1,Plasma:1}},tritiumFire:{name:'Тритиевый огонь · пример 1:1',parts:{Oxygen:1,Tritium:1}},frezon:{name:'Фрезон · при 73,15 K',parts:{Oxygen:50,Tritium:1,Nitrogen:5}},coolant:{name:'Охлаждение фрезоном',parts:{Nitrogen:5,Frezon:1}},n2o:{name:'Закись азота из аммиака',parts:{Ammonia:1,Oxygen:1}},air:{name:'Воздух · пример 21/79',parts:{Oxygen:21,Nitrogen:79}}};
  function mixture(id,total){const p=presets[id];if(!p||!Number.isFinite(total)||total<=0)return null;const sum=Object.values(p.parts).reduce((a,b)=>a+b,0);return Object.entries(p.parts).map(([gas,n])=>({gas,percent:n/sum*100,moles:n/sum*total}));}
  function pressure(moles,temperature,volume,r=8.314462618){return [moles,temperature,volume,r].every(n=>Number.isFinite(n)&&n>0)?moles*r*temperature/volume:null;}
  function pressureMixture(id,p,temperature,volume,unit='K',r=8.314462618){if(!['K','C'].includes(unit))return null;const kelvin=unit==='C'?temperature+273.15:temperature;if(![p,kelvin,volume,r].every(n=>Number.isFinite(n)&&n>0))return null;const total=p*volume/(r*kelvin);if(!Number.isFinite(total)||total<=0)return null;const rows=mixture(id,total);if(!rows)return null;let accumulated=0;return {kelvin,moles:total,rows:rows.map(row=>{const partial=p*row.percent/100;accumulated+=partial;return {...row,pressure:partial,until:accumulated};})};}
  const api={presets,mixture,pressure,pressureMixture};if(typeof module!=='undefined')module.exports=api;
  if(typeof window==='undefined')return;window.AtmosDesk=api;
  const d=window.ENGINEERING_DATA,host=document.getElementById('engineering');if(!host||!d)return;
  const c=d.constants,$=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])),fmt=n=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:3}).format(n),gas=id=>d.gases.find(g=>g.id===id)?.name||id;
  function thumbnail(id){const visual=d.images?.[id];return visual?.layers?.length?`<span class="thumbnail atmos-thumbnail" aria-hidden="true">${visual.layers.map(l=>`<span style="background-image:url('${esc(l.src)}');background-size:${l.sheetWidth/l.width*100}% ${l.sheetHeight/l.height*100}%"></span>`).join('')}</span>`:'';}
  window.AtmosThumbnail=thumbnail;
  const guides={
  "PlasmaFire": {
    "name": "Плазменный огонь → тритий или CO₂",
    "mix": "Для трития: кислород : плазма ≥96:1 по приведённому давлению.",
    "steps": [
      "Подготовьте изолированную камеру, подачу чистых газов и отдельный фильтр трития.",
      "Пример входа: 960 кПа кислорода и 10 кПа плазмы при одной температуре и одном объёме. Доли смесителя: 98,969% и 1,031%, если температуры входов одинаковы.",
      "Для горения температура камеры должна быть выше 373,15 K. Скорость растёт до 1643,15 K. Поддерживайте избыток кислорода по анализатору.",
      "Отбирайте тритий и охлаждайте отдельно от кислорода: в горячей смеси он может сразу сгорать."
    ],
    "notes": [
      "Все количества в карточке приведены к 293,15 K и 1000 л. Рабочая температура реакции указана отдельно; фактическое давление горячей камеры будет другим.",
      "Доля трития в продукте сгоревшей плазмы = clamp((O₂/плазма −32)/64,0,1). При соотношении ≤32:1 получается CO₂; между 32:1 и 96:1 — оба продукта.",
      "На каждые 10 кПа израсходованной плазмы образуется суммарно 10 кПа трития и CO₂ при тех же опорных условиях. Расход кислорода составляет 14…4 кПа в зависимости от рабочей температуры. Избыток 96:1 — условие выхода трития, а не расход кислорода."
    ],
    "preset": "tritium"
  },
  "TritiumFire": {
    "name": "Тритиевый огонь → водяной пар",
    "mix": "Пример подачи O₂ : тритий =1:1. Расход кислорода — половина расхода трития.",
    "steps": [
      "Отфильтруйте тритий и подайте его с кислородом в отдельную камеру.",
      "Начальная смесь, например: 100 кПа трития +100 кПа кислорода, приведённых к одинаковым условиям. Нагрейте камеру примерно до 373,15 K и выше.",
      "Для усиленной ветки кислорода должно быть не меньше трития; дополнительно проверяется тепловая энергия смеси. По одному давлению режим определить нельзя.",
      "Контролируйте температуру и отводите пар."
    ],
    "notes": [
      "При 293,15 K и 1000 л расход 100 кПа трития соответствует расходу 50 кПа кислорода и образованию 100 кПа пара. Реакция меняет температуру, поэтому реальные показания давления не обязаны совпасть с этим балансом.",
      "При недостатке кислорода или тепловой энергии реакция идёт медленнее. Пропорция тритий:O₂=2:1 соответствует расходу, но не условию усиленной ветки O₂≥тритий."
    ],
    "preset": "tritiumFire"
  },
  "FrezonProduction": {
    "name": "Получение фрезона",
    "mix": "Пример: O₂ : тритий : азот =50:1:5 при одинаковых условиях.",
    "steps": [
      "Получите тритий, отделите его от плазмы, CO₂ и горячего кислорода.",
      "Пример запаса: 500 кПа O₂, 10 кПа трития и 50 кПа азота, приведённых к 293,15 K и 1000 л. Охладите рабочую смесь до 73,15 K или ниже.",
      "При одинаковых температурах входов первый смеситель смешивает O₂ и тритий 50:1, второй добавляет азот в соотношении 51:5 к этой смеси.",
      "Отбирайте фрезон в отдельный контур. Азот и фрезон при температуре выше 23,15 K могут одновременно реагировать с охлаждением и образованием N₂O."
    ],
    "notes": [
      "Эффективность e=T/73,15. При расходе 500 кПа O₂ и 10 кПа трития теоретический продукт — 510e кПа фрезона и 510(1−e) кПа дополнительного азота, приведённых к 293,15 K и 1000 л. Азот-катализатор самой реакцией синтеза не расходуется.",
      "Это баланс количества газа, не давление холодного выхода. При тех же количестве газа и объёме давление при 73,15 K составляет примерно четверть давления при 293,15 K.",
      "Низкая температура уменьшает эффективность выхода, а конкурирующая реакция расходует готовый фрезон. Рассчитывайте начальную смесь калькулятором и уточняйте фактический выход по замерам."
    ],
    "preset": "frezon"
  },
  "FrezonCoolant": {
    "name": "Фрезон + азот → охлаждение и N₂O",
    "mix": "Полный баланс: 5 частей азота +1 часть фрезона →6 частей N₂O.",
    "steps": [
      "Подготовьте отдельный охлаждающий контур. Пример: 500 кПа азота +100 кПа фрезона, приведённых к 293,15 K и 1000 л.",
      "Реакция идёт выше 23,15 K. По мере охлаждения скорость снижается.",
      "Отфильтровывайте N₂O и пополняйте фрезон: хладагент расходуется."
    ],
    "notes": [
      "При достаточном количестве обоих реагентов пример даёт до 600 кПа N₂O при опорных 293,15 K и 1000 л. Реальное давление охлаждённого продукта ниже.",
      "При недостатке азота полный баланс 5:1 неприменим. Итоговое охлаждение зависит от теплоёмкости всей смеси."
    ],
    "preset": "coolant"
  },
  "AmmoniaOxygenReaction": {
    "name": "Аммиак + кислород → закись азота",
    "mix": "2 части NH₃ +2 части O₂ →1 часть N₂O +3 части пара.",
    "steps": [
      "Приготовьте аммиак и кислород в равных долях.",
      "Нагрейте до 323,149 K или выше. Отделяйте N₂O и пар фильтрами."
    ],
    "notes": [
      "Пример при опорных 293,15 K и 1000 л: расход 200 кПа NH₃ +200 кПа O₂ →100 кПа N₂O +300 кПа пара.",
      "Разбавление замедляет реакцию. При температуре 850 K и выше N₂O начинает разлагаться."
    ],
    "preset": "n2o"
  },
  "N2ODecomposition": {
    "name": "Разложение закиси азота",
    "mix": "2 части N₂O →2 части азота +1 часть кислорода.",
    "steps": [
      "Подайте N₂O в нагреваемый контур и доведите температуру до 850 K или выше.",
      "Разделите азот и кислород фильтром и охладите перед дальнейшим использованием."
    ],
    "notes": [
      "Пример при 293,15 K и 1000 л: расход 200 кПа N₂O →200 кПа N₂ +100 кПа O₂. Это приведённые давления, не горячие показания камеры.",
      "За вызов реакции распадается половина имеющейся закиси. Это термическая реакция, а не работа газового переработчика."
    ]
  }
};
  const gasNotes={Oxygen:'Окислитель для плазмы и трития, компонент фрезона. Отделяйте от топлива при хранении.',Nitrogen:'Катализатор получения фрезона; вместе с готовым фрезоном расходуется на охлаждение. Для обычного воздуха используют смесь с кислородом.',CarbonDioxide:'Продукт плазменного горения без полного кислородного перенасыщения. Удаляйте из контура дыхательного воздуха.',Plasma:'Топливо. При большом избытке кислорода даёт тритий, иначе CO₂. Не смешивайте горячие линии топлива с общей подачей воздуха.',Tritium:'Получается из плазменного огня; нужен для фрезона и тритиевого горения. В горячем кислороде расходуется.',WaterVapor:'Продукт горения трития и реакции аммиака. Автоматическая реакция выпадения луж из пара в reactions.yml закомментирована.',Ammonia:'С кислородом при нагреве даёт N₂O и пар. Источник газа зависит от оборудования и карты; отдельной реакции синтеза аммиака в этом списке нет.',NitrousOxide:'Получается из аммиака с O₂ либо фрезона с азотом. При 850 K распадается на азот и кислород.',Frezon:'Получается из O₂, трития и азота на холоде. Высокая теплоёмкость; с азотом расходуется на охлаждение.'};
  const equipment=[
    ['Анализатор газа','Проверяйте состав, температуру и давление в камере и трубах. Процент на смесителе не доказывает такой же процент в реакторе.','Content.Server/Atmos/EntitySystems/GasAnalyzerSystem.cs'],
    ['Смеситель','Два входа и один выход. Сначала выровняйте температуры: температуры входов влияют на фактическое соотношение газов. Для трёх газов используйте два смесителя; проверьте порты и чистоту входов.','Content.Server/Atmos/Piping/Trinary/EntitySystems/GasMixerSystem.cs'],
    ['Фильтр','Выбранный газ направляется в отдельный выход, остаток — в другой. Поставьте приёмные ёмкости на правильные порты и контролируйте давление обоих выходов.','Content.Server/Atmos/Piping/Trinary/EntitySystems/GasFilterSystem.cs'],
    ['Насос давления / объёмный насос','Первый задаёт целевое давление на выходе, второй — переносимый объём. Проверьте питание, направление и запас газа; остановка потока не обязательно означает пустой вход.','Content.Server/Atmos/Piping/Binary/EntitySystems/GasPressurePumpSystem.cs'],
    ['Клапан и регулятор','Клапан перекрывает участок сети. Регулятор управляет потоком по условиям давления; не заменяет источник газа или активный насос.','Content.Server/Atmos/Piping/Binary/EntitySystems/GasPressureRegulatorSystem.cs'],
    ['Нагреватель / охладитель','Изменяет температуру подключённого газа. Достижение заданной температуры зависит от мощности, теплоёмкости и потока; ориентируйтесь на анализатор, а не только уставку.','Content.Server/Atmos/Piping/Unary/EntitySystems/GasThermoMachineSystem.cs'],
    ['Вентиляция и скруббер','Вентиляция подаёт или откачивает газ в зависимости от режима. Скруббер удаляет выбранные примеси. Проверьте настройки воздушной сигнализации и куда приходит откачанный газ.','Content.Server/Atmos/Piping/Unary/EntitySystems/GasVentScrubberSystem.cs'],
    ['Канистра и соединительный порт','Подключение к трубам и выпуск газа в помещение — разные операции. Перед открытием клапана проверьте, что именно соединено и какое давление снаружи.','Content.Server/Atmos/Piping/Unary/EntitySystems/GasCanisterSystem.cs'],
    ['Газовый переработчик','Пассивно пропускает газ по перепаду давления. В стандартном компоненте переработка включается от 573,15 K и 30 атмосфер (3039,75 кПа). CO₂ превращается в O₂, N₂O — только в N₂. В отличие от термического разложения N₂O, кислород из него этот прибор не возвращает.','Content.Server/Atmos/Piping/Binary/EntitySystems/GasRecyclerSystem.cs'],
    ['Конденсатор','С питанием переводит газ из трубы в жидкий реагент. При 293,15 K и объёме 1000 л на 1 кПа чистого газа приходится примерно 0,0877 ед. жидкого реагента. Смешанный газ даёт смесь реагентов, поэтому предварительно фильтруйте.','Content.Server/Atmos/Piping/Unary/EntitySystems/GasCondenserSystem.cs']
  ];
  host.innerHTML=`<div class="science-hero"><div><div class="eyebrow">ИНЖЕНЕРИЯ / ПО ФАЙЛАМ СБОРКИ</div><h2 id="engineering-title">Атмосия</h2><p>Газы, смеси, огонь и охлаждение — с условиями, которые действительно проверяет игра.</p></div><div class="science-stats"><b>${d.gases.length} / ${d.reactions.length}</b><span>газов / реакций</span></div></div><div class="science-tabs science-topics" role="group" aria-label="Разделы инженерии"><button aria-pressed="true" aria-controls="atmos-content">Атмосия</button></div><div id="atmos-content"><div class="science-tabs" role="group" aria-label="Справочник атмоса">${[['reactions','Рецепты и огонь'],['gases','Все газы'],['equipment','Оборудование'],['practice','Порядок работы'],['calculator','Калькулятор смесей'],['economy','Цены и время'],['sm','СМ']].map(([id,name])=>`<button data-atmos-mode="${id}" aria-pressed="${id==='reactions'}">${name}</button>`).join('')}</div><label class="science-search atmos-search"><span>Поиск по атмосии</span><input id="atmos-search" type="search" placeholder="Тритий, фрезон, насос, разгерметизация…"></label><p id="atmos-count" class="science-source" role="status"></p><div id="atmos-results" class="science-results"></div><section id="atmos-calculator" hidden></section><section id="atmos-economy" hidden></section><section id="atmos-sm" hidden></section><p class="science-source">Локальная база ${esc(d.generated)}. Все ${d.reactions.length} активных газовых реакций из Atmospherics/reactions.yml. Данные для этой сборки SS14; количества в рецептах приведены к 293,15 K и 1000 л; рабочая температура реакции указана отдельно. Схема труб и доступное оборудование зависят от карты.</p></div>`;
  const practice=[['Запуск контура','Проверьте соединения, направление портов и питание. Закройте подачу в общую сеть. Подготовьте отдельные входы, фильтры и приёмники продуктов. Снимите начальные показания анализатором. Подавайте небольшую смесь, дождитесь изменения состава и только затем увеличивайте поток.'],['Тритий → фрезон','Кислород + плазма → горячая камера → фильтр трития → охлаждение → смешивание с холодными O₂ и N₂ → фильтр фрезона → отдельное хранение. Не переносите горячую кислородную смесь прямо в холодный синтез.'],['Разгерметизация','Найдите и устраните утечку, изолируйте участок дверями и клапанами. После герметизации восстановите состав, давление и температуру воздуха. Подача газа до устранения пробоины расходует запас. Проверьте соседние помещения.'],['Загрязнение / пожар','Перекройте источник топлива или загрязнения и отделите участок от общей подачи. Настройте откачку и фильтрацию в предназначенный контур. Контролируйте температуру, давление и примеси; возвращайте обычную вентиляцию после устранения причины.'],['Почему реакция не идёт','Проверьте минимальное количество каждого газа, температуру именно смеси, питание, клапаны и свободный выход. Для фрезона нужен азот; для трития важен текущий O₂/плазма. Газ может образовываться и сразу расходоваться другой реакцией.'],['Почему итог отличается от расчёта','Калькулятор считает начальное давление при заданной температуре и объёме. Реактор одновременно меняет температуру и состав, фильтры забирают продукт, смесители подают новую смесь. Разные температуры входов меняют соотношение газов. Не выводите давление только из процентов.']];
  let mode='reactions';
  function card(id,name,preview,body){return `<details class="science-card" data-atmos-id="${esc(id)}"><summary><span class="science-name atmos-card-title">${thumbnail(id)}<span>${esc(name)}</span></span><span class="science-preview">${esc(preview)}</span><span class="science-more">Подробнее ＋</span></summary><div class="science-card-body">${body}</div></details>`;}
  function render(){const extra=['economy','sm'].includes(mode);$('atmos-economy').hidden=mode!=='economy';$('atmos-sm').hidden=mode!=='sm';const words=$('atmos-search').value.toLowerCase().replaceAll('ё','е').split(/\s+/).filter(Boolean);const matches=s=>words.every(w=>s.toLowerCase().replaceAll('ё','е').includes(w));$('atmos-calculator').hidden=mode!=='calculator';$('atmos-results').hidden=mode==='calculator'||extra;$('atmos-search').closest('label').hidden=mode==='calculator'||extra;if(extra){$('atmos-count').textContent=mode==='sm'?'Расчёт по замерам текущего режима':'Оценка партии и времени по фактической производительности';return;}if(mode==='calculator'){$('atmos-count').textContent='Расчёт начальной смеси, а не симуляция реактора.';return;}let cards=[];
    if(mode==='reactions')cards=d.reactions.map(r=>{const g=guides[r.id];if(!g)return {search:r.id,html:card(r.id,r.id,'Новая реакция: смотрите параметры',``)};return {search:JSON.stringify([r,g]),html:card(r.id,g.name,g.mix,`<div class="science-chips"><span>${r.minimumTemperature!=null?'от '+fmt(r.minimumTemperature)+' K':''}${r.maximumTemperature!=null?'до '+fmt(r.maximumTemperature)+' K':''}</span>${Object.entries(r.minimumRequirements).map(([id,n])=>`<span>${esc(gas(id))} ≥ ${fmt(n*c.R*293.15/1000)} кПа (293,15 K; 1000 л)</span>`).join('')}</div><ol>${g.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><h4>Пропорции и ограничения</h4>${g.notes.map(s=>`<p>${esc(s)}</p>`).join('')}${g.preset?`<button class="secondary" data-atmos-preset="${g.preset}">Рассчитать смесь</button>`:''}<details class="source"><summary>Источник и параметры</summary><code>${r.source}<br>Content.Server/Atmos/Reactions/${r.effects[0].type}.cs<br>Content.Shared/Atmos/Atmospherics.cs</code><pre>${esc(JSON.stringify(r,null,2))}</pre></details>`)};});
    if(mode==='gases')cards=d.gases.map(g=>({search:JSON.stringify([g,gasNotes[g.id]]),html:card(g.id,g.name,gasNotes[g.id],`<p>${esc(gasNotes[g.id])}</p><div class="science-chips"><span>Цена чистого газа: ${fmt(g.pricePerMole*1000/(c.R*293.15))} / кПа</span><span>При 293,15 K и 1000 л</span></div><p>Реагент конденсатора: ${esc(g.reagent)}.</p><code class="source">${g.source} · ${g.id}</code>`)}));
    if(mode==='equipment')cards=equipment.map(([name,body,source],i)=>({search:name+' '+body,html:card('equipment-'+i,name,body,`<p>${esc(body)}</p><code class="source">${source}</code>`)}));
    if(mode==='practice')cards=practice.map(([name,body],i)=>({search:name+' '+body,html:card('practice-'+i,name,body,`<p>${esc(body)}</p>`)}));
    const filtered=cards.filter(v=>matches(v.search));$('atmos-count').textContent=`Найдено: ${filtered.length} / ${cards.length}`;$('atmos-results').innerHTML=filtered.map(v=>v.html).join('')||'<p class="science-empty">Совпадений нет. Измените поисковый запрос.</p>';
  }
  $('atmos-calculator').innerHTML=`<form id="atmos-mix-form" class="atmos-panel"><h3>Смесь по давлению и температуре</h3><div class="anomaly-helper-grid"><label>Схема<select name="preset">${Object.entries(presets).map(([id,p])=>`<option value="${id}">${p.name}</option>`).join('')}</select></label><label>Итоговое давление, кПа<input name="total" type="number" min="0.001" step="any" value="1000" required></label><label>Температура смеси<input name="temperature" type="number" step="any" value="293.15" required></label><label>Единицы температуры<select name="unit"><option value="K">K — кельвины</option><option value="C">°C — градусы Цельсия</option></select></label><label>Объём ёмкости / контура, л<input name="volume" type="number" min="0.001" step="any" value="1000" required></label></div><div id="atmos-mix-output" role="status"></div><p class="science-source">Объём нужен для расчёта запаса и передачи в стоимость. 1000 л — пример: укажите реальную ёмкость. Столбец «Доля давления» — вклад газа в итоговое давление, а не настройка давления его источника.</p><p class="science-source">«Заполнить до» применимо только к первоначально пустой ёмкости, чистым газам, одинаковой постоянной температуре и без реакций во время заполнения. В работающем реакторе ориентируйтесь на состав по анализатору; проценты смесителя совпадают с долями при одинаковой температуре входов.</p></form><form id="atmos-pressure-form" class="atmos-panel"><h3>Как изменится давление при нагреве</h3><div class="anomaly-helper-grid"><label>Начальное давление, кПа<input name="initial" type="number" min="0.001" step="any" value="1000" required></label><label>Начальная температура, K<input name="temperature" type="number" min="0.001" step="any" value="293.15" required></label><label>Конечная температура, K<input name="finalTemperature" type="number" min="0.001" step="any" value="373.15" required></label></div><p id="atmos-pressure-output" role="status"></p><p class="science-source">P₂ = P₁ × T₂/T₁. Для закрытого неизменного объёма, без реакций и потери газа. Температуры в этой формуле — абсолютные, в K.</p></form>`;
  const inputNumber=el=>el.value.trim()===''?NaN:Number(el.value);
  function currentMix(){const f=$('atmos-mix-form').elements;return pressureMixture(f.preset.value,inputNumber(f.total),inputNumber(f.temperature),inputNumber(f.volume),f.unit.value,c.R);}
  window.AtmosDesk.currentMix=currentMix;
  function updateMix(){const result=currentMix(),f=$('atmos-mix-form').elements;$('atmos-mix-output').innerHTML=result?`<p><b>${fmt(Number(f.total.value))} кПа</b> при <b>${fmt(result.kelvin)} K (${fmt(result.kelvin-273.15)} °C)</b></p><div class="atmos-table-wrap"><table class="atmos-table"><thead><tr><th>Газ</th><th>Смеситель, %</th><th>Доля давления, кПа</th><th>Заполнить до, кПа</th></tr></thead><tbody>${result.rows.map(r=>`<tr><td>${thumbnail(r.gas)} ${esc(gas(r.gas))}</td><td>${fmt(r.percent)}%</td><td>${fmt(r.pressure)}</td><td>${fmt(r.until)}</td></tr>`).join('')}</tbody></table></div>${f.preset.value==='frezon'?`<p class="science-callout">Пропорция 50:1:5 рассчитана как пример для 73,15 K. ${result.kelvin>73.15?'Сейчас температура выше порога: синтез фрезона не запустится.':'Полученный фрезон может расходоваться на охлаждение; это расчёт входной смеси, не выхода.'}</p>`:''}`:'<p>Введите положительные давление и объём, а также температуру выше абсолютного нуля (0 K / −273,15 °C).</p>';}
  function updatePressure(){const f=$('atmos-pressure-form').elements,values=[f.initial,f.temperature,f.finalTemperature].map(inputNumber),p=values[0]*values[2]/values[1];$('atmos-pressure-output').textContent=values.every(n=>Number.isFinite(n)&&n>0)&&Number.isFinite(p)?`После изменения температуры: ${fmt(p)} кПа.`:'Введите положительные давление и абсолютные температуры.';}
  host.querySelector('.science-hero h2').insertAdjacentHTML('afterbegin',thumbnail('equipment-0')+' ');
  $('atmos-mix-form').querySelector('h3').insertAdjacentHTML('afterbegin',thumbnail('calculator')+' ');
  $('atmos-pressure-form').querySelector('h3').insertAdjacentHTML('afterbegin',thumbnail('equipment-3')+' ');
  function setMode(next){mode=next;host.querySelectorAll('[data-atmos-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.atmosMode===mode)));render();}
  host.addEventListener('click',e=>{const tab=e.target.closest('[data-atmos-mode]');if(tab)setMode(tab.dataset.atmosMode);const preset=e.target.closest('[data-atmos-preset]');if(preset){$('atmos-mix-form').elements.preset.value=preset.dataset.atmosPreset;updateMix();setMode('calculator');}});
  let mixUnit='K';
  $('atmos-search').addEventListener('input',render);$('atmos-mix-form').addEventListener('input',e=>{const f=$('atmos-mix-form').elements;if(e.target===f.unit&&f.unit.value!==mixUnit){const t=inputNumber(f.temperature);if(Number.isFinite(t))f.temperature.value=Number((f.unit.value==='C'?t-273.15:t+273.15).toFixed(6));mixUnit=f.unit.value;}updateMix();});$('atmos-pressure-form').addEventListener('input',updatePressure);host.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>e.preventDefault()));updateMix();updatePressure();render();
})();
