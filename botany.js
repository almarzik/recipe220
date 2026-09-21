'use strict';
(() => {
  const data=window.RECIPE_DATA,botany=data?.botany;
  const $=id=>document.getElementById(id);
  if(!botany){$('botany-content').textContent='Обновите базу через update-data.cmd, чтобы загрузить ботанику.';return;}
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:3}).format(n);
  const normalize=s=>String(s).toLowerCase().replaceAll('ё','е');
  const plants=new Map(botany.plants.map(p=>[p.id,p]));
  const recipes=new Map(data.recipes.map(r=>[r.id,r]));
  const reagents=new Map(botany.plantReagents.map(r=>[r.id,r]));
  const parents=new Map();
  for(const p of plants.values())for(const target of p.mutations){if(!parents.has(target))parents.set(target,[]);parents.get(target).push(p.id);}
  function rootPaths(id,seen=new Set()) {
    if(seen.has(id)||!plants.has(id))return [];
    const previous=parents.get(id)||[];
    if(!previous.length)return [[id]];
    return previous.flatMap(parent=>rootPaths(parent,new Set([...seen,id])).map(path=>[...path,id]));
  }
  function pathsTo(id) {
    const routes=rootPaths(id);
    // Citrus species can mutate back into one another. Start from a ready seed
    // of a direct predecessor instead of inventing a root for that cycle.
    return routes.length?routes:(parents.get(id)||[]).filter(parent=>parent!==id).map(parent=>[parent,id]);
  }
  window.BotanyGuides={pathsTo};
  let section='plants',query='',selected='meatwheat',routeIndex=0;
  const mutationChance=botany.randomMutations.find(m=>m.name==='ChangeSpecies')?.baseOdds;
  function matches(values){const words=normalize(query).trim().split(/\s+/).filter(Boolean);const text=normalize(values.join(' '));return words.every(word=>text.includes(word));}
  function icon(item){const visual=data.images?.[item?.key];return visual?.layers?.length?`<span class="thumbnail large" aria-hidden="true">${visual.layers.map(l=>`<span style="background-image:url('${esc(l.src)}');background-size:${l.sheetWidth/l.width*100}% ${l.sheetHeight/l.height*100}%"></span>`).join('')}</span>`:'<span class="plant-symbol" aria-hidden="true">♧</span>';}
  function recipeFor(id){return (data.byOutput['reagent:'+id]||[]).map(key=>recipes.get(key)).filter(r=>r.id.startsWith('reaction:')).sort((a,b)=>Number(b.prototype===id)-Number(a.prototype===id)||a.ingredients.length-b.ingredients.length)[0];}
  function effectText(e){let text=e.label||e.type;if(e.amount!=null)text+=': '+(e.amount>0?'+':'')+fmt(e.amount);if(e.probability!==1)text+=' · шанс '+fmt(e.probability*100)+'%';return text;}
  function reagentCard(id,role='') {
    const reagent=reagents.get(id);if(!reagent)return '';
    const recipe=recipeFor(id);
    const composition=recipe?window.WorkbenchChemistry.expand(recipe,1,data).ingredients:[];
    return `<article class="botany-reagent"><div class="botany-card-heading"><h3>${esc(reagent.name)}</h3>${role?`<span class="botany-role">${esc(role)}</span>`:''}</div><ul>${reagent.effects.map(e=>`<li>${esc(effectText(e))}${e.conditions.length?'<small>При условиях из прототипа — см. источник.</small>':''}</li>`).join('')}</ul>${recipe?`<div class="botany-mix"><b>Исходные реагенты для приготовления</b><p>${composition.map(i=>`${esc(i.name)} — ${fmt(i.amount)} ${i.unit}${i.catalyst?' (катализатор)':''}`).join(' · ')}</p><small>На выход ${recipe.outputs.map(o=>`${esc(o.name)} ${fmt(o.amount)} ${o.unit}`).join(' + ')}. Это рецепт запаса реагента, а не доза для растения.</small><div class="botany-buttons"><button class="secondary" data-preview="${esc(recipe.id)}">Рецепт и нужный объём ↗</button><button class="add-recipe" data-botany-add="${esc(recipe.id)}">+ На поле</button></div></div>`:'<p class="note">Рецепт синтеза в базе не найден: потребуется готовый реагент.</p>'}<details class="source"><summary>Источник и все эффекты</summary><code>${esc(reagent.source)} · ${esc(reagent.id)}</code><pre>${esc(JSON.stringify(reagent.effects.map(e=>e.raw),null,2))}</pre></details></article>`;
  }
  function renderPlantDetail() {
    const p=plants.get(selected);if(!p)return '';
    const routes=pathsTo(p.id),path=routes[Math.min(routeIndex,routes.length-1)]||[p.id];
    const first=plants.get(path[0]);
    const routeChoice=routes.length>1?`<label class="botany-route-label">Цепочка <select id="botany-route">${routes.map((route,index)=>`<option value="${index}" ${index===routeIndex?'selected':''}>${esc(route.map(id=>plants.get(id).name).join(' → '))}</option>`).join('')}</select></label>`:'';
    const steps=path.slice(1).map((id,index)=>{
      const source=plants.get(path[index]),target=plants.get(id);
      return `<li><h4>${esc(source.name)} → ${esc(target.name)}</h4><p>Добавляйте <b>${esc(reagents.get('UnstableMutagen')?.name||'нестабильный мутаген')}</b> небольшими порциями и ждите обработки. Проверяйте вид анализатором растения. Нужный результат — <b>${esc(target.name)}</b>.</p><p class="note">При срабатывании смены вида возможны: ${source.mutations.map(id=>esc(plants.get(id)?.name||id)).join(', ')}. ${source.mutations.length>1?'Цель выбирается случайно из этого списка. Если получилась другая ветка, вернитесь к сохранённым исходным семенам.':'Других видов в списке этой мутации нет, но сама проверка мутации случайная.'}</p><small class="source">${esc(source.source)} · ${esc(source.id)}</small></li>`;
    }).join('');
    const chemicals=p.chemicals.map(c=>`${esc(c.name)} <span>${fmt(Math.min(c.Max??0,(c.Min??.001)+(c.PotencyDivisor>0?p.potency/c.PotencyDivisor:0)))} ед.</span>`);
    return `<article class="plant-detail"><div class="plant-detail-title">${icon(p.products[0])}<div><div class="eyebrow">${path.length>1?path.length-1+' ШАГОВ МУТАЦИИ':'ИСХОДНОЕ РАСТЕНИЕ'}</div><h3>${esc(p.name)}</h3></div></div>${routeChoice}<div class="plant-chain">${path.map(id=>`<button data-plant="${esc(id)}">${esc(plants.get(id).name)}</button>`).join('<span>→</span>')}</div><ol class="plant-steps"><li><h4>Начните с ${esc(first.name)}</h4><p>Возьмите ${esc(first.packet?.name||first.seedName)}, посадите в гидропонный лоток. Обеспечьте воду и питание, проверьте здоровье. Оставьте запас исходных семян для повторной попытки.</p>${path.length===1?'<p class="note">Входящих мутаций для этого вида в файлах нет. Для начала нужны его семена; наличие в раздатчике или раунде зависит от сборки.</p>':''}</li>${steps}<li><h4>Сохраните результат</h4><p>После получения нужного вида прекратите добавлять мутаген и дождитесь окончания его обработки. Снимите урожай; если растение даёт семена, извлеките их из плодов. Проверьте характеристики анализатором: мутации могут менять не только вид.</p></li></ol><div class="plant-harvest"><h4>Что получится</h4><p>${p.products.map(o=>esc(o.name)).join(', ')||'Продукт не указан'}</p><p class="botany-intro">Базовый состав одного плода при потенции ${fmt(p.potency)}; после мутаций и скрещивания он может отличаться.</p><ul>${chemicals.map(c=>'<li>'+c+'</li>').join('')}</ul></div><details class="source"><summary>Источник растения</summary><code>${esc(p.source)} · ${esc(p.id)}</code></details><h4 class="botany-section-title">Реагенты для этой работы</h4><p class="botany-intro">Мутаген запускает попытки. Средства ухода ниже применяйте по состоянию растения, они не являются обязательной смесью для смены вида.</p>${path.length>1?reagentCard('UnstableMutagen','Мутации'):''}${reagentCard('Cryoxadone','Здоровье и омоложение')}${reagentCard('EZNutrient','Питание')}${path.length>1?reagentCard('Left4Zed','Модификатор мутаций'):''}</article>`;
  }
  function renderPlants() {
    const filtered=botany.plants.filter(p=>matches([p.id,p.name,p.seedName,...p.aliases,...p.products.map(i=>i.name),...p.chemicals.flatMap(i=>[i.name,i.id])])).sort((a,b)=>Number((parents.get(b.id)||[]).length>0)-Number((parents.get(a.id)||[]).length>0)||a.name.localeCompare(b.name,'ru'));
    if(!filtered.some(p=>p.id===selected)){selected=filtered[0]?.id;routeIndex=0;}
    $('botany-summary').textContent=`${botany.plants.length} растений · ${botany.plants.reduce((n,p)=>n+p.mutations.length,0)} переходов между видами. Найдено: ${filtered.length}. Выберите растение — справа появится цепочка.`;
    $('botany-content').innerHTML=filtered.length?`<div class="botany-layout"><div class="plant-list">${filtered.map(p=>`<button class="plant-option" data-plant="${esc(p.id)}" aria-pressed="${p.id===selected}">${icon(p.products[0])}<span><b>${esc(p.name)}</b><small>${(parents.get(p.id)||[]).length?'Получается мутацией':'Исходные семена'}${p.mutations.length?' · дальше '+p.mutations.length+' мутаций':''}</small></span></button>`).join('')}</div><div id="plant-detail">${renderPlantDetail()}</div></div>`:'<p class="botany-empty">Растения не найдены. Для поиска криоксадона как средства ухода откройте «Реагенты для растений»; как случайного состава урожая — «Случайные мутации».</p>';
  }
  function renderReagents() {
    const filtered=botany.plantReagents.filter(r=>matches([r.id,r.name,...r.effects.map(effectText)]));
    const preferred=['UnstableMutagen','Cryoxadone','Left4Zed','EZNutrient','RobustHarvest','Sedin'];
    filtered.sort((a,b)=>(preferred.includes(a.id)?preferred.indexOf(a.id):-1+100)-(preferred.includes(b.id)?preferred.indexOf(b.id):-1+100)||a.name.localeCompare(b.name,'ru'));
    $('botany-summary').textContent=`Найдено ${filtered.length} реагентов с действием на растения. Эффекты указаны на одно срабатывание. Лоток обрабатывает каждый присутствующий реагент, если осталось хотя бы 1 ед., и расходует по 1 ед. за обновление. Больший запас не означает гарантированную мутацию.`;
    $('botany-content').innerHTML=`<div class="botany-reagent-grid">${filtered.map(r=>reagentCard(r.id)).join('')}</div>${filtered.length?'':'<p>Реагенты не найдены.</p>'}`;
  }
  function renderMutations() {
    const filtered=botany.randomMutations.filter(m=>matches([m.name,m.label,m.effect?.targetValue||'']));
    const chemicals=botany.randomChemicals.filter(c=>matches([c.name,c.id]));
    $('botany-summary').textContent='Все активные случайные мутации из сборки. Проверки независимы: за одну попытку может измениться несколько свойств. Шанс = min(базовый коэффициент × сила мутации, 100%). Сила ограничена 25; это не количество налитого реагента.';
    $('botany-content').innerHTML=`<div class="botany-explainer"><h3>Как работать с мутациями</h3><ol><li>Посадите нужный исходный вид, обеспечьте воду и питание, оставьте запас семян.</li><li>Добавляйте нестабильный мутаген и проверяйте результат анализатором после обработки.</li><li>Для смены вида воспользуйтесь цепочками в разделе растений. Базовый коэффициент смены вида — ${fmt(mutationChance*100)}% при силе 1; конкретная ветка выбирается случайно.</li><li>Для изменения состава урожая продолжайте попытки и проверяйте реагенты анализатором. Нельзя заказать конкретное вещество одной фиксированной смесью.</li><li>При нужном результате прекратите мутации, сохраните семена, поддерживайте здоровье растения. Криоксадон полезен для лечения и омоложения.</li></ol></div><div class="mutation-grid">${filtered.map(m=>`<article class="mutation-tile"><h3>${esc(m.label)}</h3><p class="mutation-chance">${fmt(m.baseOdds*100)}% × сила</p>${m.effect?.minValue!=null?`<p>Диапазон параметра: ${m.effect.minValue}–${m.effect.maxValue}; шагов изменения: ${m.effect.steps}.</p>`:''}${m.name==='ChangeChemicals'?'<p>Добавляет случайный реагент или увеличивает максимум уже имеющегося. Список возможных веществ — ниже.</p>':''}${m.name==='ChangeSpecies'?'<p>Выбор только среди мутаций текущего вида; цепочки открываются в разделе растений.</p>':''}<details class="source"><summary>Детали эффекта</summary><code>${esc(m.source)} · ${esc(m.name)}</code><pre>${esc(JSON.stringify(m.effect,null,2))}</pre></details></article>`).join('')}</div><div class="botany-explainer"><h3>Возможные реагенты в урожае после случайной мутации</h3><p>Это общий случайный пул, а не обязательный состав конкретного растения. Криоксадон в нём есть: получить его можно случайно, фиксированной гарантированной цепочки до криоксадона нет. Обычные врождённые реагенты ищите в составе выбранного растения.</p><div class="random-chemicals">${chemicals.map(c=>`<span class="ingredient-chip">${esc(c.name)} <small>вес ${c.weight}</small></span>`).join('')}</div></div><details class="source"><summary>Код игровой механики</summary><code>${botany.sources.map(esc).join('<br>')}</code></details>`;
  }
  function renderMutagen() {
    $('botany-summary').textContent='Нестабильный мутаген: приготовление, дозировка и работа с растениями по файлам этой сборки.';
    $('botany-content').innerHTML=`<div class="botany-explainer"><h3>Как применять мутаген</h3><ol>
      <li><b>Подготовьте растение.</b> Посадите исходный вид из цепочки, обеспечьте воду и питание. Сохраните запас семян: результат случайный.</li>
      <li><b>Приготовьте запас.</b> Радий + фосфор + хлор в равных долях. Например, по 10 ед. каждого → 30 ед. нестабильного мутагена. Рецепт ниже можно добавить на поле и задать нужный выход.</li>
      <li><b>Начните с 1 ед. в лоток с живым растением.</b> Это небольшая пробная порция, а не гарантированная доза смены вида. Дождитесь обработки реагента и следующего цикла мутаций, затем проверьте растение анализатором.</li>
      <li><b>Повторяйте после проверки.</b> Если нужный вид ещё не получился, добавьте следующую небольшую порцию. При другой ветке начните заново с запасных семян. Следите за здоровьем, водой и питанием.</li>
      <li><b>Закрепите результат.</b> Прекратите добавление, учитывайте остаток мутагена в лотке и уже накопленный уровень мутации. После завершения обработки сохраните семена нужного растения из урожая, если оно не стало бессемянным.</li>
    </ol></div><div class="mutation-grid">
      <article class="mutation-tile"><h3>Почему не нужно лить весь кувшин</h3><p>За обновление лоток обрабатывает каждый реагент при наличии хотя бы 1 ед. и расходует по 1 ед. Мутаген прибавляет 1 × модификатор к уровню мутации за срабатывание. При уровне 25 и выше обработка раствора приостанавливается до проверки мутаций.</p><p>В цикл мутаций сила равна накопленному уровню, но не больше 25; затем уровень сбрасывается. Большой объём — запас для дальнейшей обработки, а не мгновенная сила или обещание нужного результата.</p></article>
      <article class="mutation-tile"><h3>Смена вида и случайные свойства</h3><p>Базовый шанс проверки смены вида — ${fmt(mutationChance*100)}% × сила, максимум 100%. После успешной проверки выбирается случайная ветка текущего растения. Если веток нет, смены вида не будет.</p><p>Другие свойства проверяются независимо: могут измениться урожайность, потенция и состав плодов. Конкретный реагент, в том числе криоксадон, нельзя гарантировать фиксированной дозой мутагена.</p></article>
      <article class="mutation-tile"><h3>Нужен ли Left4Zed?</h3><p>Не обязателен. За срабатывание даёт +1 питания, −0,5 здоровья и с шансом 30% повышает модификатор мутаций на 0,4. Модификатор ограничен 3. Сам по себе он не прибавляет уровень мутации и не выбирает нужную ветку.</p><p>Криоксадон применяйте для ухода и омоложения по состоянию растения: он не гарантирует нужную мутацию.</p></article>
    </div>${reagentCard('UnstableMutagen','Приготовить мутаген')}<details class="source"><summary>Источники механики</summary><code>Resources/Prototypes/Reagents/toxins.yml<br>Resources/Prototypes/Recipes/Reactions/chemicals.yml<br>Resources/Prototypes/Reagents/botany.yml<br>Content.Server/Botany/Systems/PlantHolderSystem.cs<br>Content.Server/Botany/Systems/MutationSystem.cs</code></details>`;
  }
  function render(){ $('botany-search').closest('label').hidden=section==='mutagen';if(section==='plants')renderPlants();else if(section==='reagents')renderReagents();else if(section==='mutagen')renderMutagen();else renderMutations();}
  $('botany-search').addEventListener('input',e=>{query=e.target.value;render();});
  $('botany').addEventListener('click',e=>{
    const tab=e.target.closest('[data-botany-section]');if(tab){section=tab.dataset.botanySection;document.querySelectorAll('[data-botany-section]').forEach(b=>b.setAttribute('aria-pressed',String(b===tab)));render();return;}
    const plant=e.target.closest('[data-plant]');if(plant){selected=plant.dataset.plant;routeIndex=0;if(!plants.has(selected))return;document.querySelectorAll('.plant-option').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.plant===selected)));$('plant-detail').innerHTML=renderPlantDetail();return;}
    const add=e.target.closest('[data-botany-add]');if(add)document.dispatchEvent(new CustomEvent('workbench:add-recipe',{detail:{id:add.dataset.botanyAdd}}));
  });
  $('botany').addEventListener('change',e=>{if(e.target.id==='botany-route'){routeIndex=Number(e.target.value);$('plant-detail').innerHTML=renderPlantDetail();}});
  render();
})();
