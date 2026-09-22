(function(scope){
  function conflicts(laws){
    const errors=[];
    for(let i=0;i<laws.length;i++)for(let j=i+1;j<laws.length;j++){
      const a=laws[i].code,b=laws[j].code;
      if(a.slice(1)===b.slice(1))errors.push(`${a} и ${b}: одинаковые последние две цифры. Оставьте наиболее тяжёлую применимую статью.`);
      if(a==='309'&&['102','202','302'].includes(b)||b==='309'&&['102','202','302'].includes(a))errors.push(`${a} и ${b}: КЗ запрещает суммировать эти статьи.`);
    }
    return errors;
  }
  const minuteText=n=>`${Number(n.toFixed(3)).toLocaleString('ru-RU')} мин`;
  // SS220 revision 14940: aggregation first; increases before reductions.
  function calculateBase(laws,choices={},mods={}){
    const steps=[],errors=[],notes=[];
    if(!laws.length)return {kind:'empty',minutes:null,steps,errors,notes,label:'Выберите статьи'};
    const active=laws.filter(l=>!['defense','necessity','conversion'].includes(choices[l.code]?.exemption));
    for(const l of laws.filter(l=>!active.includes(l)))steps.push(`${l.code}: обвинение снято — ${ {defense:'подтверждённая самооборона',necessity:'крайняя необходимость',conversion:'внешний контроль разума снят'}[choices[l.code].exemption]}.`);
    errors.push(...conflicts(active));
    if(active.some(l=>l.code==='100')&&active.some(l=>l.code==='208')&&!mods.independentDamage)errors.push('100 + 208: подтвердите, что ущерб нанесён после вторжения, а не при самом взломе.');
    const rows=active.map(l=>{
      const c=choices[l.code]||{},minutes=c.minutes===undefined?({1:5,2:10,3:15,4:30,5:0}[l.severity]):Number(c.minutes),repeat=Number(c.repeat||1);
      const valid=l.severity===1?Number.isInteger(minutes)&&minutes>=0&&minutes<=5:l.severity===3?[15,20].includes(minutes):minutes===({2:10,4:30,5:0}[l.severity]);
      if(!valid||!Number.isInteger(repeat)||repeat<1||repeat>5)errors.push(`Проверьте срок и номер приговора по ${l.code}.`);
      return {law:l,minutes,repeat,accomplice:!!c.accomplice};
    });
    if(mods.review)errors.push('Сначала проверьте заявленную самооборону / крайнюю необходимость; подтверждённое основание выберите у конкретной статьи.');
    if(errors.length)return {kind:'conflict',minutes:null,steps,errors,notes,label:'Нужна проверка'};
    if(!active.length)return {kind:'released',minutes:0,steps,errors,notes,label:'Обвинения сняты'};
    if(rows.some(r=>r.law.severity===5))return {kind:'special',minutes:null,steps,errors,notes:['5XX: пермабриг, казнь или киборгизация. Вид наказания выбирает уполномоченное лицо; процентные скидки не переводят его в минуты.'],label:'Высшая мера'};
    const sum=rows.reduce((s,r)=>s+r.minutes,0),cap=Math.max(...rows.map(r=>r.minutes))*1.5;
    let total=rows.length>1?Math.min(sum,cap):sum;
    steps.push(`По статьям: ${rows.map(r=>`${r.law.code}: ${minuteText(r.minutes)}`).join(' + ')} = ${minuteText(sum)}.`);
    if(rows.length>1)steps.push(`Предел совокупности: ${minuteText(cap)} (самый большой срок × 1,5). После ограничения: ${minuteText(total)}.`);
    const repeatBonus=rows.reduce((s,r)=>s+(r.repeat-1)*10,0);
    const addRepeat=()=>{if(repeatBonus){total+=repeatBonus;steps.push(`Рецидив: +${minuteText(repeatBonus)} → ${minuteText(total)} (${rows.filter(r=>r.repeat>1).map(r=>`${r.law.code}: приговор №${r.repeat}`).join(', ')}).`);}};
    const addRefusal=()=>{if(mods.refusal){total*=1.5;steps.push(`Отказ от сотрудничества: × 1,5 → ${minuteText(total)}.`);}};
    if(mods.order==='refusal-first'){addRefusal();addRepeat();}else{addRepeat();addRefusal();}
    if(repeatBonus&&mods.refusal)notes.push('КЗ задаёт повышения до снижений, но не уточняет порядок рецидива и отказа. Выбранный порядок показан в расчёте; согласуйте его при вынесении приговора.');
    // Mixed principal/accessory cases require an explicit decision: the source does not define allocation of the aggregation cap.
    if(rows.some(r=>r.accomplice)&&!rows.every(r=>r.accomplice))return {kind:'conflict',minutes:null,steps,errors:['Смешаны собственные статьи и пособничество. КЗ не задаёт распределение общего предела для такого расчёта; разделите роли или согласуйте наказание вручную.'],notes,label:'Нужна проверка'};
    if(rows.every(r=>r.accomplice)&&rows.every(r=>r.law.severity<=2)){total*=.8;steps.push(`Пособничество по 1XX / 2XX: × 0,8 → ${minuteText(total)}.`);}
    else if(rows.every(r=>r.accomplice))steps.push('Пособничество при тяжких статьях: 100% срока.');
    if(mods.cooperation){total*=.5;steps.push(`Сотрудничество со следствием: × 0,5 → ${minuteText(total)}.`);}
    if(mods.surrender){total*=.5;steps.push(`Явка с повинной: × 0,5 → ${minuteText(total)}.`);}
    if(active.some(l=>l.severity===4))notes.push('4XX: увольнение с должности обязательно.');
    else if(active.some(l=>l.severity===3))notes.push('3XX: понижение или увольнение на усмотрение главы отдела.');
    else if(active.some(l=>l.severity===2))notes.push('2XX: понижение на усмотрение главы отдела.');
    if(active.some(l=>l.code==='405'))notes.push('405: имплант отслеживания и ограничение радиосвязи.');
    if(rows.some(r=>r.repeat>=5)||total>=60){notes.push('Пермабриг назначает смотритель, ГСБ, капитан или ПНТ. Киборгизация вместо него — с волеизъявления заключённого.');if(total>90)notes.push('Свыше 90 минут допускается казнь по решению капитана или ПНТ.');return {kind:'permanent',minutes:total,steps,errors,notes,label:'Пермабриг',reason:rows.some(r=>r.repeat>=5)?'Пятое нарушение той же статьи':'Срок достиг 60 минут'};}
    return {kind:total===0?'warning':'timed',minutes:total,steps,errors,notes,label:total===0?'Предупреждение':minuteText(total)};
  }
  function calculate(laws,choices={},mods={}){
    let r=calculateBase(laws,choices,mods);
    if(mods.unaccusedAccessory){
      r=laws.length?{kind:'conflict',minutes:null,label:'Нужна проверка',steps:[],notes:[],errors:['Пособничество без обвинений у основного нарушителя рассчитывается отдельно. Уберите статьи основного нарушителя.']}:
        calculateBase([{code:'Пособничество',severity:1}],{},mods);
      r.steps.unshift('Пособничество: основному нарушителю обвинения не предъявлены — базовый срок помощника 5 минут.');
    }
    if(mods.medical)r.notes.push('Необходимость медицинской помощи: оказать помощь. Таймер продолжает идти; его не сбрасывают и время не добавляют. При самоповреждении оказание помощи — на усмотрение СБ.');
    const action=(kind,label,note)=>{
      if(r.kind!=='empty')r.steps.push(`Расчёт до особого решения: ${r.label}${r.minutes!==null?' ('+minuteText(r.minutes)+')':''}.`);
      if(['released','directive'].includes(kind)){
        r.steps.push(...r.notes.filter(n=>!n.startsWith('Необходимость медицинской помощи:')).map(n=>'До особого решения: '+n));
        r.notes=r.notes.filter(n=>n.startsWith('Необходимость медицинской помощи:'));
      }
      r={...r,kind,label,minutes:null,reason:undefined,notes:[...r.notes,note]};
    };
    if(mods.conversion==='controlled')action('conversion','Сначала деконвертация','Вражеская конвертация: задержать нелетально и снять внешний контроль разума. Освобождение — после деконвертации; этот выбор относится ко всем рассматриваемым деяниям.');
    if(mods.conversion==='restored'){
      action('released','Деконвертация: освободить','Все рассматриваемые деяния совершены под внешним контролем, контроль снят: снять обвинения и немедленно освободить. Контрабанду и опасные предметы, полученные при конвертации, изъять без юридических последствий.');r.errors=[];
    }
    if(mods.parole){
      if(mods.conversion==='controlled')r.notes.push('УДО не заменяет деконвертацию: сначала устраните внешний контроль.');
      else if(!['empty','conflict','released'].includes(r.kind))action('parole','Условно-досрочное освобождение','УДО: условия по СРП юридического отдела проверены, решение одобрено. Освободить до первого нарушения; обвинения не снимаются.');
      else r.notes.push('УДО отмечено. Для его применения нужен действующий проверенный приговор; после снятия всех обвинений УДО не требуется.');
    }
    if(mods.threat==='move'){
      r.notes.push('Непосредственная угроза заключённому: немедленно переместить в безопасное место. Само перемещение не снимает обвинения и не меняет срок.');
      if(!['released','parole','conversion'].includes(r.kind))action('transfer','Переместить в безопасное место','Сначала обеспечьте безопасность заключённого; исходный расчёт сохранён в шагах.');
    }
    if(mods.threat==='release')action('emergency','Немедленно освободить','Непосредственная угроза: перемещение в безопасное место невозможно. Освободить, не подвергая жизнь опасности. Это не снятие обвинений и не УДО.');
    if(mods.directive){
      const text=String(mods.directiveText||'').trim();
      if(text){action('directive','Исполнить директиву ЦК',`Директива Центрального Командования: ${text}`);r.errors=[];r.notes.push('Директива имеет приоритет. Срок и действия определяются её текстом, автоматические скидки к ней не применяются.');}
      else{r.kind='conflict';r.label='Укажите директиву ЦК';r.minutes=null;r.errors.push('Введите полученное предписание ЦК, чтобы его можно было включить в решение.');}
    }
    if(r.kind==='empty'&&mods.medical)action('medical','Оказать медицинскую помощь','Срок не выбран. Медицинская помощь не создаёт нового наказания.');
    if(laws.length===1&&laws[0].severity===1&&r.kind==='timed'){r.label+=' / Пред';r.notes.push('Пред — можно ограничиться предупреждением за малозначительную статью.');}
    return r;
  }
  scope.SecurityDesk={conflicts,calculate};
  if(!scope.document||!scope.SECURITY_DATA)return;
  const d=scope.SECURITY_DATA,$=id=>document.getElementById(id),esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const selected=new Set(),byCode=new Map(d.laws.map(l=>[l.code,l])),choices={};
  const categories=['','Малозначительные','Средней тяжести','Тяжкие','Особо тяжкие','Высшая мера'];
  $('security').innerHTML=`<div class="security-intro"><div><span class="security-tag">СЛУЖБА БЕЗОПАСНОСТИ</span><h2 id="security-title">Космический закон</h2><p>Наведите на статью для примера. Нажмите на название для пояснений.<br>Галочка добавит статью в материалы дела ниже.</p></div><a href="${d.source}" target="_blank" rel="noopener">Открыть КЗ на вики ↗</a></div>
    <p class="security-source">${esc(d.updated)} Редакция ${d.revision}. Учебные примеры добавлены для сайта и не заменяют текст КЗ.</p>
    <div class="security-controls"><input id="law-search" type="search" placeholder="Код, название, пример…" aria-label="Поиск по Космическому закону"><select id="law-severity" aria-label="Тяжесть статьи"><option value="">Все категории</option>${categories.slice(1).map((c,i)=>`<option value="${i+1}">${i+1}XX · ${c}</option>`).join('')}</select><span id="law-count" role="status"></span></div>
    <div class="law-table-wrap"><table class="law-table"><caption><span>Справочник статей</span><small>По коду и тяжести нарушения</small></caption><thead><tr><th scope="col" class="law-axis">Код</th>${categories.slice(1).map((c,i)=>`<th scope="col" data-severity="${i+1}"><span class="law-level">${i+1}XX</span><span class="law-category">${c}</span><small>${['до 5 мин / предупреждение','10 мин','15 или 20 мин','30 мин','решение уполномоченных лиц'][i]}</small></th>`).join('')}</tr></thead><tbody id="law-table-body"></tbody></table></div>
    <p id="law-empty" hidden>Ничего не найдено. Измените запрос или категорию.</p>
    <div id="security-selected" class="security-selected"></div><p id="security-conflicts" class="security-alert" role="status"></p>
    <p class="security-source">${esc(d.attribution)} <a href="${d.source}?oldid=${d.revision}" target="_blank" rel="noopener">Источник и авторы SS220 WIKI</a> · <a href="${d.license}" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>. Материалы КЗ и их адаптация распространяются по этой лицензии. Это внутриигровой справочник; правила сервера имеют приоритет.</p>`;
  $('security-title').textContent='Калькулятор наказания · SS220';
  document.querySelector('.security-intro p').textContent='Выберите статьи, уточните сроки и обстоятельства. Итог пересчитывается сразу. Нажмите на карточку, чтобы добавить статью в дело. При наведении показывается пример, «Пояснение» открывает полный текст.';
  const layout=document.createElement('div');layout.className='security-layout';
  layout.innerHTML='<section class="security-catalog" aria-label="Статьи Космического закона"></section><aside class="security-calculator" aria-label="Расчёт наказания"><div class="sentence-head"><h3>Итог по делу</h3><button type="button" id="sentence-clear">Очистить</button></div><div id="sentence-result" aria-live="polite"></div><div class="sentence-actions"><button type="button" id="sentence-copy" disabled>Копировать расчёт</button><button type="button" id="sentence-layout" aria-pressed="false">Панель снизу</button></div><p id="sentence-status" role="status"></p><h3>Выбранные статьи</h3><div id="sentence-charges"></div><div id="sentence-modifiers"><h3>Обстоятельства дела</h3><label class="sentence-check"><input id="sentence-cooperation" type="checkbox">Сотрудничество со следствием <b>−50%</b></label><small>Предоставленная информация должна быть подлинной.</small><label class="sentence-check"><input id="sentence-refusal" type="checkbox">Отказ от процедур в бриге <b>+50%</b></label><label id="sentence-order-label" hidden>Порядок повышающих модификаторов<select id="sentence-order"><option value="repeat-first">Сначала рецидив, затем +50%</option><option value="refusal-first">Сначала +50%, затем рецидив</option></select></label><label id="sentence-damage-label" class="sentence-check" hidden><input id="sentence-damage" type="checkbox">Ущерб по 100 нанесён после вторжения по 208</label></div><details class="sentence-help"><summary>Как считается срок</summary><p>1XX: предупреждение или до 5 минут. 2XX: 10. 3XX: выбор 15 или 20. 4XX: 30. Для 5XX конечного срока нет.</p><p>Сумма ограничивается 1,5 срока самой тяжёлой статьи. Затем идут повышения, после них — снижения. Явка и сотрудничество вместе дают × 0,25.</p><p>Повторный приговор за ту же статью: второй +10, третий +20, четвёртый +30 минут; пятый — пермабриг. Несколько действий в одном эпизоде не считаются рецидивом.</p><p>60 минут и более — пермабриг; свыше 90 минут допускается казнь. Это не дополнительные минуты в обычной камере.</p><p>Сверяйте совместимость статей: один предмет нельзя учитывать дважды. Для пособничества без обвинений у основного нарушителя КЗ отдельно предусматривает 5 минут.</p><p>Директива ЦК, УДО, враги корпорации и побег требуют отдельного решения по КЗ. Медпомощь не останавливает таймер; при угрозе заключённого перемещают или освобождают.</p></details></aside>';
  const catalog=layout.querySelector('.security-catalog'),aside=layout.querySelector('aside');
  const jump=document.createElement('button');jump.type='button';jump.className='sentence-jump';jump.textContent='К расчёту ↓';jump.addEventListener('click',()=>aside.scrollIntoView({behavior:'smooth',block:'start'}));
  $('security').append(jump);
  document.querySelector('.security-controls').before(layout);
  catalog.append(document.querySelector('.security-controls'),document.querySelector('.law-table-wrap'),$('law-empty'));
  $('sentence-charges').append($('security-selected'),$('security-conflicts'));
  const enabled=new Set();
  const damageLabel=$('sentence-damage-label');
  $('sentence-charges').append(damageLabel);
  const modifierDefinitions=[
    ['accessory','Пособничество','80% / 100%'],['directive','Директива ЦК','Особое решение'],
    ['cooperation','Сотрудничество с СБ','−50%'],['conversion','Контроль разума','Деконвертация'],
    ['threat','Угроза заключённому','Переместить / освободить'],['refusal','Отказ от сотрудничества','+50%'],
    ['repeat','Рецидив','Выбрать повтор ▾'],['defense','Самооборона','Снятие обвинений'],
    ['surrender','Явка с повинной','−50%'],['necessity','Крайняя необходимость','Снятие обвинений']
  ];
  const panels=new Set(['accessory','directive','conversion','threat','repeat','defense','necessity']);
  $('sentence-modifiers').innerHTML=`<h3 id="sentence-modifiers-title">Модификаторы</h3><p class="modifier-intro">Нажмите, чтобы включить. Повторное нажатие отключает модификатор.</p><div class="modifier-buttons" role="group" aria-labelledby="sentence-modifiers-title">${modifierDefinitions.map(([key,label,hint])=>`<button type="button" id="sentence-${key}" data-modifier="${key}" aria-pressed="false" ${panels.has(key)?`aria-expanded="false" aria-controls="modifier-panel-${key}"`:''}><span>${label}</span><small>${hint}</small></button>`).join('')}</div>
    <div id="modifier-panel-accessory" class="modifier-panel" hidden><h4>Пособничество</h4><label class="sentence-special-label">Основание<select id="sentence-accessory-mode"><option value="charged">Основному нарушителю предъявлены выбранные статьи</option><option value="unaccused">Основному нарушителю не предъявлены обвинения · 5 минут</option></select></label><p>Применяется ко всем выбранным статьям: 80% при 1XX / 2XX, 100% при более тяжких. Для случая без обвинений уберите статьи из дела.</p></div>
    <div id="modifier-panel-directive" class="modifier-panel" hidden><label class="sentence-special-label">Директива ЦК<textarea id="sentence-directive-text" maxlength="3000" placeholder="Введите полученное предписание ЦК"></textarea></label></div>
    <div id="modifier-panel-conversion" class="modifier-panel" hidden><label class="sentence-special-label">Контроль разума<select id="sentence-conversion-stage"><option value="controlled">Контроль ещё действует</option><option value="restored">Деконвертация выполнена — освободить</option></select></label><p>Относится ко всем рассматриваемым деяниям. До деконвертации — нелетальное задержание; после — снятие обвинений и освобождение.</p></div>
    <div id="modifier-panel-threat" class="modifier-panel" hidden><label class="sentence-special-label">Угроза заключённому<select id="sentence-threat-action"><option value="move">Можно переместить в безопасное место</option><option value="release">Переместить невозможно — освободить</option></select></label></div>
    <div id="modifier-panel-repeat" class="modifier-panel" hidden><h4>Рецидив</h4><p>Отдельный повторный приговор по той же статье, а не несколько действий в одном эпизоде.</p><div id="modifier-repeat-fields"></div></div>
    <div id="modifier-panel-defense" class="modifier-panel" hidden><h4>Самооборона подтверждена</h4><label class="sentence-special-label">Снять обвинение<select id="modifier-defense-scope"></select></label><p>Самосуд не является самообороной. Основание должно быть установлено.</p></div>
    <div id="modifier-panel-necessity" class="modifier-panel" hidden><h4>Крайняя необходимость подтверждена</h4><label class="sentence-special-label">Снять обвинение<select id="modifier-necessity-scope"></select></label><p>Причинённый вред должен быть меньше предотвращённого.</p></div>
    <p id="modifier-cooperation-hint" class="modifier-hint" hidden>Сотрудничество с СБ: сведения должны быть подлинными.</p><p id="modifier-surrender-hint" class="modifier-hint" hidden>Явка с повинной: самостоятельно прийти в бриг и признаться. Арест без сопротивления не считается явкой.</p><p id="modifier-refusal-hint" class="modifier-hint" hidden>Отказ от процедурных действий уже в бриге при ожидании приговора.</p>
    <label id="sentence-order-label" class="sentence-special-label" hidden>Порядок повышающих модификаторов<select id="sentence-order"><option value="repeat-first">Сначала рецидив, затем +50%</option><option value="refusal-first">Сначала +50%, затем рецидив</option></select></label>`;
  function scopeMatches(key,code){const value=$('modifier-'+key+'-scope').value;return value==='all'||value===code;}
  function syncModifierButtons(){
    for(const [key] of modifierDefinitions){const on=enabled.has(key),b=$('sentence-'+key);b.setAttribute('aria-pressed',String(on));if(panels.has(key)){b.setAttribute('aria-expanded',String(on));$('modifier-panel-'+key).hidden=!on;}const hint=$('modifier-'+key+'-hint');if(hint)hint.hidden=!on;}
  }
  function renderModifierFields(){
    for(const key of ['defense','necessity']){const el=$('modifier-'+key+'-scope'),old=el.value;if(old&&old!=='all'&&!selected.has(old))enabled.delete(key);el.innerHTML='<option value="all">Все выбранные статьи</option>'+selectedLaws().map(l=>`<option value="${l.code}">${l.code} · ${esc(l.name)}</option>`).join('');el.value=selected.has(old)?old:'all';}
    $('modifier-repeat-fields').innerHTML=selectedLaws().map(l=>`<label class="sentence-special-label">${l.code} · ${esc(l.name)}<select data-sentence-field="repeat" data-code="${l.code}">${[1,2,3,4,5].map(n=>`<option value="${n}" ${n===Number(choices[l.code]?.repeat||1)?'selected':''}>${['Первый','Второй · +10 мин','Третий · +20 мин','Четвёртый · +30 мин','Пятый · пермабриг'][n-1]}</option>`).join('')}</select></label>`).join('')||'<p>Сначала выберите статью.</p>';
  }
  $('sentence-modifiers').addEventListener('click',e=>{const b=e.target.closest('[data-modifier]');if(!b)return;const key=b.dataset.modifier;if(enabled.has(key))enabled.delete(key);else enabled.add(key);invalidate();$('sentence-status').textContent='';renderSentence();});

  const dialog=document.createElement('dialog');dialog.id='law-dialog';dialog.setAttribute('aria-labelledby','law-dialog-title');dialog.innerHTML='<div class="dialog-heading"><h2 id="law-dialog-title"></h2><button id="law-close" class="icon-button" aria-label="Закрыть статью">×</button></div><div id="law-dialog-content"></div><div class="dialog-actions"><button id="law-select" class="primary">Добавить в дело</button></div>';document.body.append(dialog);
  const tooltip=document.createElement('div');tooltip.id='law-tooltip';tooltip.className='law-tooltip';tooltip.role='tooltip';tooltip.hidden=true;document.body.append(tooltip);
  let currentLaw=null;
  function selectedLaws(){return [...selected].map(code=>byCode.get(code)).filter(Boolean).sort((a,b)=>a.code.localeCompare(b.code));}
  function modifiers(){return {surrender:enabled.has('surrender'),cooperation:enabled.has('cooperation'),refusal:enabled.has('refusal'),order:$('sentence-order').value,independentDamage:$('sentence-damage').checked,unaccusedAccessory:enabled.has('accessory')&&$('sentence-accessory-mode').value==='unaccused',conversion:enabled.has('conversion')?$('sentence-conversion-stage').value:'',threat:enabled.has('threat')?$('sentence-threat-action').value:'',directive:enabled.has('directive'),directiveText:$('sentence-directive-text').value};}
  function effectiveChoices(){return Object.fromEntries(selectedLaws().map(l=>{const c={...choices[l.code]};c.repeat=enabled.has('repeat')?(c.repeat||1):1;c.accomplice=enabled.has('accessory')&&$('sentence-accessory-mode').value==='charged';c.exemption=enabled.has('defense')&&scopeMatches('defense',l.code)?'defense':enabled.has('necessity')&&scopeMatches('necessity',l.code)?'necessity':'';return [l.code,c];}));}
  function sentence(){return calculate(selectedLaws(),effectiveChoices(),modifiers());}
  function sentenceText(r){return ['РАСЧЁТ ПО КЗ SS220',...selectedLaws().map(l=>`${l.code} — ${l.name}`),'',`Итог: ${r.label}`,r.reason||'',...r.steps,...r.errors.map(e=>'Требует проверки: '+e),...r.notes,`Источник: ${d.source} (редакция ${d.revision})`].filter(Boolean).join('\n');}
  function renderSentence(){
    const r=sentence();
    const seconds=r.minutes===null?0:Math.round(r.minutes*60);
    jump.textContent=['empty','conflict'].includes(r.kind)?'К расчёту ↓':`${r.label} · к расчёту ↓`;
    $('sentence-result').dataset.kind=r.kind;
    $('sentence-result').innerHTML=`<div class="sentence-value">${esc(r.label)}</div>${r.kind==='timed'?`<div class="sentence-clock">Таймер камеры: ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}</div>`:''}${r.reason?`<p>${esc(r.reason)}${r.minutes!==null?` · расчётный срок ${minuteText(r.minutes)}`:''}</p>`:''}${r.kind==='empty'?'<p>Отметьте статью в справочнике. Здесь появятся срок и его расчёт.</p>':''}${r.errors.map(e=>`<p class="security-alert">${esc(e)}</p>`).join('')}${r.steps.length?`<details class="sentence-breakdown" open><summary>Расчёт по шагам</summary><ol>${r.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></details>`:''}${r.notes.map(n=>`<p class="sentence-note">${esc(n)}</p>`).join('')}`;
    $('security-conflicts').textContent='';
    $('sentence-copy').disabled=['empty','conflict'].includes(r.kind);
    $('sentence-clear').disabled=!selected.size&&!enabled.size;
    syncModifierButtons();
    $('sentence-order-label').hidden=!(enabled.has('refusal')&&enabled.has('repeat')&&selectedLaws().some(l=>choices[l.code]?.repeat>1));
    $('sentence-damage-label').hidden=!(selected.has('100')&&selected.has('208'));
    if($('sentence-damage-label').hidden)$('sentence-damage').checked=false;
  }
  function choiceMarkup(l){
    const minutes=choices[l.code]?.minutes??({1:5,2:10,3:15,4:30,5:0}[l.severity]);
    const options=l.severity===1?[0,1,2,3,4,5]:l.severity===3?[15,20]:[minutes];
    return `<article class="sentence-charge"><div class="sentence-charge-head"><strong>${l.code} · ${esc(l.name)}</strong><button type="button" data-remove-charge="${l.code}" aria-label="Убрать статью ${l.code}">×</button></div><label class="sentence-special-label">Наказание<select data-sentence-field="minutes" data-code="${l.code}" ${l.severity===5?'disabled':''}>${options.map(n=>`<option value="${n}" ${n===Number(minutes)?'selected':''}>${l.severity===5?'Высшая мера':n===0?'Предупреждение':minuteText(n)}</option>`).join('')}</select></label></article>`;
  }
  function render(){
    const search=$('law-search').value.trim().toLowerCase().replaceAll('ё','е'),severity=$('law-severity').value;
    const matches=d.laws.filter(l=>(!severity||String(l.severity)===severity)&&`${l.code} ${l.name} ${l.example} ${l.paragraphs.join(' ')}`.toLowerCase().replaceAll('ё','е').includes(search));
    $('law-count').textContent=`Статей: ${matches.length} / ${d.laws.length}`;$('law-empty').hidden=matches.length>0;
    $('law-table-body').innerHTML=Array.from({length:10},(_,suffix)=>{
      const row=matches.filter(l=>Number(l.code.slice(1))===suffix);if(!row.length)return '';
      return `<tr><th scope="row" class="law-axis"><span>${String(suffix).padStart(2,'0')}</span></th>${[1,2,3,4,5].map(level=>{const l=row.find(l=>l.severity===level);return l?`<td data-severity="${level}"><div class="law-cell" data-example="${l.code}"><button type="button" class="law-name law-add" data-charge="${l.code}" aria-pressed="${selected.has(l.code)}" aria-describedby="law-tooltip"><strong>${l.code}</strong><span class="law-label">${esc(l.name)}</span><span class="law-selection">${selected.has(l.code)?'✓ В деле':'+ В дело'}</span></button><button type="button" class="law-explain" data-law="${l.code}">Пояснение</button></div></td>`:'<td class="law-empty"><span aria-label="Нет статьи">·</span></td>';}).join('')}</tr>`;
    }).join('');
    $('security-selected').innerHTML=selectedLaws().map(choiceMarkup).join('')||'<span class="sentence-empty">Дело пока пустое.</span>';
    renderModifierFields();
    renderSentence();
  }
  function invalidate(){ $('sentence-status').textContent=''; const fallback=$('sentence-copy-text');if(fallback)fallback.remove(); }
  function setCharge(code,on){tooltip.hidden=true;if(on)selected.add(code);else{selected.delete(code);delete choices[code];}invalidate();$('sentence-status').textContent='';render();}
  function openLaw(code){currentLaw=byCode.get(code);if(!currentLaw)return;tooltip.hidden=true;$('law-dialog-title').textContent=`${code} — ${currentLaw.name}`;$('law-dialog-content').innerHTML=`<p><b>${esc(currentLaw.penalty)}</b></p><p class="law-example"><b>Учебный пример:</b> ${esc(currentLaw.example)}</p><h3>Пояснение из КЗ</h3>${currentLaw.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<a target="_blank" rel="noopener" href="${d.source}#${encodeURIComponent(currentLaw.anchor)}">Статья на вики ↗</a>`;$('law-select').textContent=selected.has(code)?'Убрать из дела':'Добавить в дело';dialog.showModal();}
  $('law-close').addEventListener('click',()=>dialog.close());
  $('law-select').addEventListener('click',()=>{setCharge(currentLaw.code,!selected.has(currentLaw.code));dialog.close();});
  $('security').addEventListener('click',e=>{const law=e.target.closest('[data-law]');if(law){openLaw(law.dataset.law);return;}const charge=e.target.closest('[data-charge]');if(charge){setCharge(charge.dataset.charge,!selected.has(charge.dataset.charge));return;}const remove=e.target.closest('[data-remove-charge]');if(remove)setCharge(remove.dataset.removeCharge,false);});
  for(const id of ['law-search','law-severity'])$(id).addEventListener('input',render);
  function showTip(e){const b=e.target.closest('[data-example]');if(!b)return;tooltip.textContent='Учебный пример: '+byCode.get(b.dataset.example).example;tooltip.hidden=false;const r=b.getBoundingClientRect();tooltip.style.left=Math.max(10,Math.min(r.left,window.innerWidth-tooltip.offsetWidth-10))+'px';tooltip.style.top=Math.max(10,Math.min(r.bottom+8,window.innerHeight-tooltip.offsetHeight-10))+'px';}
  $('law-table-body').addEventListener('pointerover',showTip);$('law-table-body').addEventListener('focusin',showTip);
  $('law-table-body').addEventListener('pointerout',()=>tooltip.hidden=true);$('law-table-body').addEventListener('focusout',()=>tooltip.hidden=true);
  window.addEventListener('scroll',()=>tooltip.hidden=true,true);window.addEventListener('keydown',e=>{if(e.key==='Escape')tooltip.hidden=true;});
  document.addEventListener('click',e=>{if(e.target.closest('.page-tab'))tooltip.hidden=true;});
  $('sentence-clear').addEventListener('click',()=>{selected.clear();enabled.clear();for(const code of Object.keys(choices))delete choices[code];$('sentence-damage').checked=false;$('sentence-order').value='repeat-first';$('sentence-accessory-mode').value='charged';$('sentence-conversion-stage').value='controlled';$('sentence-threat-action').value='move';$('sentence-directive-text').value='';invalidate();render();});
  $('sentence-directive-text').addEventListener('input',()=>{invalidate();$('sentence-status').textContent='';renderSentence();});
  $('security').addEventListener('change',e=>{
    const key=e.target.dataset.sentenceField;
    if(key){const code=e.target.dataset.code;choices[code]||={};choices[code][key]=key==='accomplice'?e.target.checked:key==='exemption'?e.target.value:Number(e.target.value);}
    if(key||e.target.closest('#sentence-modifiers')||e.target.id==='sentence-damage'){invalidate();$('sentence-status').textContent='';renderSentence();}
  });
  $('sentence-layout').addEventListener('click',()=>{const stacked=layout.classList.toggle('security-stack');$('sentence-layout').setAttribute('aria-pressed',String(stacked));$('sentence-layout').textContent=stacked?'Панель справа':'Панель снизу';});
  $('sentence-copy').addEventListener('click',async()=>{
    const r=sentence();if(['empty','conflict'].includes(r.kind))return;
    const value=sentenceText(r);
    try{await navigator.clipboard.writeText(value);$('sentence-status').textContent='Расчёт скопирован.';}
    catch{let field=$('sentence-copy-text');if(!field){field=document.createElement('textarea');field.id='sentence-copy-text';field.readOnly=true;field.setAttribute('aria-label','Расчёт для копирования');$('sentence-status').after(field);}field.value=value;field.focus();field.select();$('sentence-status').textContent='Расчёт выделен. Нажмите Ctrl+C.';}
  });
  render();
})(typeof module==='object'&&module.exports?module.exports:window);
