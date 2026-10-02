'use strict';
(() => {
  const data = window.RECIPE_DATA;
  const $ = id => document.getElementById(id);
  if (!data) { $('empty-board').textContent = 'Не удалось загрузить recipes.js. Выполните обновление данных по инструкции README.md.'; return; }
  const categories = { all:{name:'Все рецепты',icon:'◈'},chem:{name:'Химия',icon:'⚗',color:'var(--chem)'},food:{name:'Кулинария',icon:'◒',color:'var(--food)'},bar:{name:'Барменство',icon:'♧',color:'var(--bar)'} };
  const recipes = new Map([...data.recipes,...(window.PLAYER_RECIPES||[])].map(r => [r.id,r]));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const number = n => new Intl.NumberFormat('ru-RU',{maximumFractionDigits:3}).format(n);
  const storageKey = 'ss14-recipe-workbench-v1';
  let cards = [], category = 'all', query = '', subgroup = '', limit = 36, z = 0, pendingVariant, toastTimer;
  const searchText = new Map(data.recipes.map(r => [r.id, [r.name,r.prototype,r.group,...r.ingredients.flatMap(i=>[i.name,i.id])].join(' ').toLocaleLowerCase('ru').replaceAll('ё','е')]));
  try { const saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(saved)) cards = saved.filter(c=>recipes.has(c.recipeId) && typeof c.uid==='string').map(c=>({...c,x:Math.max(0,Math.min(50000,Number(c.x)||0)),y:Math.max(0,Math.min(50000,Number(c.y)||0)),scale:Number.isFinite(Number(c.scale))&&Number(c.scale)>0?Number(c.scale):1,checked:Array.isArray(c.checked)?c.checked:[],done:!!c.done})); } catch { $('save-status').textContent = 'Сохранение недоступно: проверьте настройки браузера'; }
  function save() { try { localStorage.setItem(storageKey,JSON.stringify(cards)); } catch { $('save-status').textContent = 'Не удалось сохранить поле в браузере'; } }
  function toast(message) { $('toast').textContent=message; $('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600); }
  function thumbnail(item, large=false) {
    const visual=data.images?.[item?.key];
    if(visual?.layers?.length) return `<span class="thumbnail${large?' large':''}" aria-hidden="true">${visual.layers.map(l=>`<span style="background-image:url('${esc(l.src)}');background-size:${l.sheetWidth/l.width*100}% ${l.sheetHeight/l.height*100}%"></span>`).join('')}</span>`;
    const color=/^(#[\da-f]{3,8}|[a-z]+)$/i.test(visual?.color||'')?visual.color:'#aac8bd';
    return `<span class="thumbnail${large?' large':''} fallback" aria-hidden="true">${visual?.reagent?`<span class="reagent-drop" style="background:${esc(color)}"></span>`:'◒'}</span>`;
  }
  function title(r) { return ['food','chem'].includes(r.category)?`<button class="recipe-title" data-preview="${esc(r.id)}" title="Посмотреть рецепт">${r.category==='food'?thumbnail(r.outputs[0],true):''}<span>${esc(r.name)}</span></button>`:esc(r.name); }
  function conditions(r) { return `<div class="recipe-conditions"><span class="condition">${esc(r.method)}</span>${r.conditions.map(s=>`<span class="condition">${esc(s)}</span>`).join('')}</div>`; }
  function ingredientsMarkup(r,scale,checked=[],preview=false) {
    if(r.category==='chem')return chemistryMarkup(r,scale,checked).replaceAll(preview?/<input[^>]*type="checkbox"[^>]*>/g:/$^/g,'');
    return `<ul class="ingredients">${r.ingredients.map((i,index)=>`<li>${preview?'<span class="preview-ingredient">':'<label><input type="checkbox" data-ingredient="'+index+'" '+(checked.includes(index)?'checked':'')+'>'}${r.category==='food'?thumbnail(i):''}<span class="ingredient-name">${esc(i.name)}${i.catalyst?'<small class="catalyst">катализатор · не расходуется</small>':''}</span>${preview?'</span>':'</label>'}<span class="quantity">${number(amount(i,scale))} ${i.unit}</span>${(data.byOutput[i.key]||[]).some(id=>id!==r.id)?`<button class="expand" ${preview?'data-preview-ingredient':'data-expand'}="${preview?esc(i.key):index}" aria-label="${preview?'Посмотреть':'Добавить'} рецепт ингредиента: ${esc(i.name)}">${preview?'↗':'[+]'}</button>`:''}</li>`).join('')}</ul>`;
  }
  function chemistryMarkup(r,scale,checked) {
    const plan=window.WorkbenchChemistry.expand(r,scale,data);
    const steps=[...plan.steps,{recipe:r,scale,final:true}],made=new Map();
    const process=steps.map((step,index)=>{
      const key='chem-step:'+index,product=step.product,output=step.recipe.outputs.map(o=>`${esc(o.name)} — ${number(o.amount*step.scale)} ${o.unit}`).join(' + ');
      const ingredients=step.recipe.ingredients.map(i=>{const previous=!i.catalyst?made.get(i.key):null;return `<li><span>${esc(i.name)}${previous!=null?`<small>Взять готовым из шага ${previous}</small>`:''}${i.catalyst?'<small class="catalyst">Катализатор · не расходуется</small>':''}</span><b>${number(amount(i,step.scale))}<small>${esc(i.unit)}</small></b></li>`;}).join('');
      if(product)made.set(product.key,index+1);
      return `<li class="chem-stage${step.final?' chem-final':''}${checked.includes(key)?' is-complete':''}"><div class="chem-stage-title"><span class="chem-step-number">${index+1}</span><strong>${step.final?'Финальное смешивание':esc(product.name)}</strong><input type="checkbox" data-chem-step="${key}" aria-label="Шаг ${index+1} выполнен" ${checked.includes(key)?'checked':''}></div><p class="chem-vessel">${step.final?'В итоговой ёмкости':'Приготовить отдельно'}</p><ul class="chem-dose-list">${ingredients}</ul><p class="chem-step-output">Получится: <b>${output||'реакция без предметного выхода'}</b></p>${product?`<p class="chem-transfer">Для следующего этапа отмерьте <b>${number(step.requested)} ${esc(product.unit)}</b> ${esc(product.name)}. ${step.recipe.ingredients.some(i=>i.catalyst)?'Катализатор отделите; его объём не входит в нужное количество продукта.':''}</p>`:''}${step.recipe.conditions.length?conditions(step.recipe):''}${step.recipe.note?`<details class="chem-stage-note"><summary>Условия и примечания</summary><p>${esc(step.recipe.note)}</p></details>`:''}</li>`;
    }).join('');
    return `<div class="chem-plan"><p class="chem-route-label">${steps.length===1?'Одна реакция':steps.length+' шага до готового препарата'}</p><div class="chem-steps"><ol class="chem-process">${process}</ol></div><details class="chem-stock"><summary>Общий запас исходных веществ · ${plan.ingredients.length}</summary><p class="note">Сумма для всех шагов, а не смесь в одном стакане. Катализаторы рассчитаны на повторное использование.</p><ul class="ingredients">${plan.ingredients.map(i=>`<li><label><input type="checkbox" data-chem-check="${esc(i.checkKey)}" ${checked.includes(i.checkKey)?'checked':''}><span class="ingredient-name">${esc(i.name)}${i.catalyst?'<small class="catalyst">катализатор</small>':''}</span></label><span class="quantity">${number(i.amount)} ${esc(i.unit)}</span></li>`).join('')}</ul></details><p class="chem-rounding">Дробные количества округлены для отображения. Не округляйте каждую дозу до целых: итоговый объём изменится.</p>${plan.warnings.map(w=>`<p class="note">${esc(w)}</p>`).join('')}</div>`;
  }
  let previewHistory=[], previewChoosing=false;
  function showPreview(id,scale,push=true,target={}) {
    const r=recipes.get(id);if(!r)return;
    scale??=r.category==='chem'&&r.outputs[0]?.unit==='ед.'?200/r.outputs[0].amount:1;
    $('preview-content').classList.toggle('chem-preview',r.category==='chem');
    previewChoosing=false;
    const state={id,scale,...target};
    if(push)previewHistory.push(state);
    $('preview-back').hidden=previewHistory.length<2;
    $('preview-title').textContent=r.name;
    $('preview-content').innerHTML=`<div class="preview-hero">${thumbnail(r.outputs[0],true)}<span>${esc(r.group)}</span></div>${conditions(r)}${outputControls(r,state,true)}<p class="yield">${r.outputs.length?'Выход: '+r.outputs.map(o=>`${esc(o.name)} · ${number(o.amount*scale)} ${o.unit}`).join(' + '):'Реакция без предметного выхода'}</p>${r.note?'<p class="note">'+esc(r.note)+'</p>':''}${ingredientsMarkup(r,scale,[],true)}<p class="source"><code>${esc(r.prototype)}<br>${esc(r.source)}</code></p>`;
    if(!$('recipe-preview').open)$('recipe-preview').showModal();
  }
  function setWorkspaceCollapsed(collapsed) {
    $('workspace-content').hidden=collapsed;
    $('workspace-content').closest('.workspace').classList.toggle('is-collapsed',collapsed);
    $('toggle-workspace').setAttribute('aria-expanded',String(!collapsed));
    $('toggle-workspace').textContent=collapsed?'Показать поле ↓':'Скрыть поле ↑';
    for(const id of ['arrange','clear-done','clear'])$(id).hidden=collapsed;
    try{localStorage.setItem('ss14-workspace-collapsed',String(collapsed));}catch{}
    if(!collapsed)requestAnimationFrame(layout);
  }
  function rememberWorkspaceHeight() {
    if($('workspace-content').hidden)return;
    const height=$('viewport').getBoundingClientRect().height;
    if(!height)return;
    $('workspace-content').closest('.workspace').classList.toggle('is-tall',height+220>window.innerHeight);
    if(document.activeElement!==$('workspace-height'))$('workspace-height').value=Math.round(height);
    try{localStorage.setItem('ss14-workspace-height',String(Math.round(height)));}catch{}
  }
  function setWorkspaceHeight(height) {
    $('viewport').style.height=height+'px';$('workspace-height').value=height;
    $('workspace-content').closest('.workspace').classList.toggle('is-tall',height+220>window.innerHeight);
    try{localStorage.setItem('ss14-workspace-height',String(height));}catch{}
    layout();
  }
  $('workspace-height').addEventListener('change',e=>{
    const height=Number(e.target.value);
    if(Number.isFinite(height)&&height>=120)setWorkspaceHeight(height);
    else e.target.value=parseFloat($('viewport').style.height)||475;
  });
  $('workspace-size-reset').addEventListener('click',()=>setWorkspaceHeight(475));
  $('workspace-jump').addEventListener('click',()=>{setWorkspaceCollapsed(false);$('workspace-content').closest('.workspace').scrollIntoView({behavior:'smooth',block:'start'});});
  window.WorkbenchNavigation.mount({onWorkspaceVisible:()=>requestAnimationFrame(layout)});
  document.addEventListener('workbench:add-recipe',e=>{if(recipes.has(e.detail?.id))addCard(e.detail.id);});
  function renderCategories() { $('categories').innerHTML=Object.entries(categories).map(([key,c])=>`<button class="category-tab" data-category="${key}" aria-pressed="${category===key}">${c.icon} ${c.name}<span>${key==='all'?data.recipes.length:data.recipes.filter(r=>r.category===key).length}</span></button>`).join(''); }
  function renderGroups() { const groups=[...new Set(data.recipes.filter(r=>category==='all'||r.category===category).map(r=>r.group))].sort((a,b)=>a.localeCompare(b,'ru'));$('subgroup').innerHTML='<option value="">Все разделы</option>'+groups.map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('');$('subgroup').value=subgroup; }
  function renderCatalog() {
    $('chef-tools').hidden=category!=='food';
    const words=query.toLocaleLowerCase('ru').replaceAll('ё','е').trim().split(/\s+/).filter(Boolean);
    const filtered=data.recipes.filter(r=>(category==='all'||r.category===category)&&(!subgroup||r.group===subgroup)&&words.every(w=>searchText.get(r.id).includes(w)));
    $('result-count').textContent=`Найдено: ${filtered.length} · показано ${Math.min(limit,filtered.length)}`;
    $('recipes').innerHTML=filtered.slice(0,limit).map(r=>`<article class="recipe-tile" style="--cat:${categories[r.category].color}"><div class="tile-top"><span class="badge">${esc(r.group)}</span><span class="method-icon" aria-label="${categories[r.category].name}">${categories[r.category].icon}</span></div><h3>${title(r)}</h3><div class="tile-ingredients${r.category==='food'?' with-thumbnails':''}">${(r.category==='chem'?window.WorkbenchChemistry.expand(r,1,data).ingredients:r.ingredients).map(i=>r.category==='food'?`<span class="ingredient-chip">${thumbnail(i)}<span>${esc(i.name)}</span></span>`:esc(i.name)).join(r.category==='food'?'':' · ')}</div><div class="tile-bottom"><span class="tile-method">${esc(r.method)}${r.conditions.length?' · '+esc(r.conditions.join(' · ')):''}</span><button class="add-recipe" data-add="${esc(r.id)}" aria-label="Добавить: ${esc(r.name)}">+ На поле</button></div></article>`).join('');
    $('recipes').querySelectorAll('[data-add]').forEach(button=>{const r=recipes.get(button.dataset.add);if(r.category!=='chem')return;button.closest('.recipe-tile').classList.add('chem-tile');if(r.outputs[0]?.unit==='ед.')button.textContent='+ 200 ед. на поле';const steps=window.WorkbenchChemistry.expand(r,1,data).steps.length+1;button.closest('.recipe-tile').querySelector('h3').insertAdjacentHTML('afterend',`<p class="chem-catalog-hint">${steps===1?'Одна реакция':steps+' шага'} · нажмите название для инструкции</p>`);});
    $('load-more').hidden=filtered.length<=limit;$('no-results').hidden=filtered.length>0;
  }
  function amount(i,scale) { return i.catalyst ? i.amount : i.amount*scale; }
  function selectedOutput(r,c) { return r.outputs.find(o=>o.key===c.outputKey)||r.outputs[0]; }
  function targetValue(r,c) { return c.targetAmount ?? (selectedOutput(r,c)?.amount||1)*c.scale; }
  function setTarget(r,c,value) {
    const output=selectedOutput(r,c);
    const minimum=output?.unit==='шт.'?1:.001;
    c.targetAmount=Number.isFinite(value)?Math.min(1000000,Math.max(minimum,value)):minimum;
    if(output?.unit==='шт.')c.targetAmount=Math.ceil(c.targetAmount);
    c.outputKey=output?.key;
    c.scale=c.targetAmount/(output?.amount||1);
    if(r.quantized||r.ingredients.some(i=>i.unit==='шт.'))c.scale=Math.ceil(c.scale-1e-10);
  }
  function outputControls(r,c,preview=false) {
    const output=selectedOutput(r,c),kind=preview?'preview-output':'output';
    const select=r.outputs.length>1?`<label class="output-product">Готовый продукт<select data-${kind}-key aria-label="Продукт для расчёта">${r.outputs.map(o=>`<option value="${esc(o.key)}" ${o.key===output.key?'selected':''}>${esc(o.name)}</option>`).join('')}</select></label>`:'';
    const extra=output&&output.amount*c.scale>targetValue(r,c)+1e-8?`<p class="note batch-note">Нужно ${number(targetValue(r,c))} ${output.unit}; готовится целыми партиями, получится ${number(output.amount*c.scale)} ${output.unit}.</p>`:'';
    const presets=r.category==='chem'&&output?.unit==='ед.'?`<div class="chem-volumes" role="group" aria-label="Объём готового препарата">${[50,100,200].map(v=>`<button type="button" data-chem-volume="${v}" aria-pressed="${Math.abs(targetValue(r,c)-v)<1e-8}">${v}${v===200?' · кувшин':''}</button>`).join('')}</div>`:'';
    return `<div class="output-settings">${select}<label class="scale-control">${output?'Нужно на выходе':'Повторений реакции'} <input type="number" min="${output?.unit==='шт.'?'1':'0.001'}" max="1000000" step="${output?.unit==='шт.'?'1':'any'}" value="${targetValue(r,c)}" data-${kind} aria-label="${output?'Нужное количество готового продукта':'Количество повторений реакции'}"><span>${output?.unit||'раз'}</span></label>${presets}${extra}</div>`;
  }
  function linkedScale(r,parent,index) {
    const ing=recipes.get(parent.recipeId).ingredients[index],output=r.outputs.find(o=>o.key===ing.key);
    let scale=output?amount(ing,parent.scale)/output.amount:1;
    if(r.ingredients.some(i=>i.unit==='шт.')||r.quantized)scale=Math.ceil(scale-1e-10);
    return scale;
  }
  function updateChildren(parent,seen=new Set()) {
    if(seen.has(parent.uid))return;seen.add(parent.uid);
    for(const child of cards.filter(c=>c.parent===parent.uid)) {
      child.scale=linkedScale(recipes.get(child.recipeId),parent,child.ingredientIndex);
      const ingredient=recipes.get(parent.recipeId).ingredients[child.ingredientIndex];
      child.outputKey=ingredient.key;child.targetAmount=amount(ingredient,parent.scale);
      child.checked=[];child.done=false;updateChildren(child,seen);
    }
  }
  function renderCard(c) {
    const r=recipes.get(c.recipeId),cat=categories[r.category];
    if(r.playerGuide){const el=renderPlayerCard(c,r);compactCard(el);return el;}
    const el=document.createElement('article');el.className='todo'+(c.done?' done':'');el.dataset.uid=c.uid;el.style.cssText=`left:${c.x}px;top:${c.y}px;--cat:${cat.color};z-index:${++z}`;
    el.innerHTML=`<div class="todo-header" tabindex="0" aria-label="Переместить: ${esc(r.name)}"><span class="grip" aria-hidden="true">⠿</span><div class="todo-heading"><small>${cat.name}</small><h3>${title(r)}</h3></div><button class="icon-button" data-action="remove" aria-label="Удалить: ${esc(r.name)}">×</button></div><div class="todo-body">${c.parent&&cards.some(p=>p.uid===c.parent)?'<p class="linked-label">↳ Ингредиент связанного рецепта</p>':''}${conditions(r)}<p class="yield">${r.outputs.length?'Выход: '+r.outputs.map(o=>`${esc(o.name)} · ${number(o.amount*c.scale)} ${o.unit}`).join(' + '):'Реакция без предметного выхода'}</p>${r.note?`<p class="note">${esc(r.note)}</p>`:''}${ingredientsMarkup(r,c.scale,c.checked)}<div class="todo-controls"><label class="done-toggle"><input type="checkbox" data-done ${c.done?'checked':''}>Готово</label>${outputControls(r,c)}</div><details class="source"><summary>Источник и ID</summary><p><code>${esc(r.prototype)}<br>${esc(r.source)}</code></p>${r.effects?`<pre>${esc(r.effects)}</pre>`:''}</details></div>`;
    if(r.category==='chem'){el.classList.add('chem-todo');const body=el.querySelector('.todo-body');body.prepend(el.querySelector('.output-settings'));}
    compactCard(el);
    return el;
  }
  function renderBoard() { $('board').querySelectorAll('.todo').forEach(el=>el.remove());cards.forEach(c=>$('board').append(renderCard(c)));$('empty-board').hidden=cards.length>0;$('board-count').textContent=cards.length;requestAnimationFrame(layout); }
  function renderPlayerCard(c,r) {
    const el=document.createElement('article');el.className='todo player-todo'+(c.done?' done':'');el.dataset.uid=c.uid;el.style.cssText=`left:${c.x}px;top:${c.y}px;--cat:#e4c48c;z-index:${++z}`;
    el.innerHTML=`<div class="todo-header" tabindex="0" aria-label="Переместить: ${esc(r.name)}"><span class="grip" aria-hidden="true">⠿</span><div class="todo-heading"><small>От Игроков · этап ${esc(r.stage)}</small><h3>${esc(r.name)}</h3></div><button class="icon-button" data-action="remove" aria-label="Удалить: ${esc(r.name)}">×</button></div><div class="todo-body"><p class="player-author">${esc(r.author)} · ${esc(r.stageTitle)}</p><p class="yield">По автору: ${esc(r.yieldText)}</p><p class="chem-label">Подготовить на авторскую партию</p><ul class="ingredients">${r.ingredients.map((i,index)=>`<li><label><input type="checkbox" data-ingredient="${index}" ${c.checked.includes(index)?'checked':''}><span class="ingredient-name">${esc(i.name)}${i.note?'<small class="ingredient-via">'+esc(i.note)+'</small>':''}</span></label><span class="quantity">${esc(i.quantity)} ${i.unit}</span></li>`).join('')}</ul>${r.note?'<p class="note">'+esc(r.note)+'</p>':''}<details class="player-card-steps" open><summary>Порядок приготовления · ${r.steps.length} шагов</summary><ol>${r.steps.map((step,index)=>`<li><label class="guide-check"><input type="checkbox" data-chem-check="player-step:${index}" ${c.checked.includes('player-step:'+index)?'checked':''}><span>${esc(step)}</span></label></li>`).join('')}</ol></details><p class="note">Фиксированная партия из методички. Авторские округления сохранены. Для расчёта другого объёма откройте рецепт сборки.</p><div class="todo-controls"><label class="done-toggle"><input type="checkbox" data-done ${c.done?'checked':''}>Готово</label>${r.officialRecipeId?`<button class="secondary" data-preview="${esc(r.officialRecipeId)}">Рецепт сборки ↗</button>`:''}</div><details class="source"><summary>Источник</summary><p><a href="${esc(r.source)}" download="химия.txt">Методичка ${esc(r.author)} ↓</a></p><code>${esc(r.prototype)}</code></details></div>`;
    return el;
  }
  function cardElement(uid) { return [...$('board').querySelectorAll('.todo')].find(e=>e.dataset.uid===uid); }
  function compactCard(el) {
    const steps=el.querySelector('.chem-steps');
    if(steps&&!el.classList.contains('chem-todo')){const details=document.createElement('details');details.className='card-more';const summary=document.createElement('summary');summary.textContent='Этапы приготовления';steps.replaceWith(details);details.append(summary,steps);}
    const playerSteps=el.querySelector('.player-card-steps');if(playerSteps)playerSteps.open=false;
    const notes=[...el.querySelectorAll('.todo-body > .note')];
    if(notes.length){const details=document.createElement('details');details.className='card-more';const summary=document.createElement('summary');summary.textContent='Примечания к рецепту';notes[0].replaceWith(details);details.append(summary,...notes);}
  }
  function layout() {
    if($('workspace-content').hidden)return;
    let width=$('viewport').clientWidth,height=$('viewport').clientHeight;
    cards.forEach(c=>{const el=cardElement(c.uid);if(el){width=Math.max(width,c.x+el.offsetWidth+30);height=Math.max(height,c.y+el.offsetHeight+30);}});
    $('board').style.width=width+'px';$('board').style.height=height+'px';
    $('connections').innerHTML=cards.filter(c=>c.parent).map(c=>{const parent=cards.find(p=>p.uid===c.parent);if(!parent)return '';const el=cardElement(parent.uid);const x1=parent.x+(el?.offsetWidth||310),y1=parent.y+70,x2=c.x,y2=c.y+70;return `<path d="M${x1} ${y1} C${x1+65} ${y1},${x2-65} ${y2},${x2} ${y2}"/>`;}).join('');
  }
  function workspaceWidth(){
    const viewport=$('viewport');
    if(viewport.clientWidth)return viewport.clientWidth;
    // Collapsing hides both the viewport and its parent, so measure the visible section.
    const section=viewport.closest('.workspace'),style=getComputedStyle(section),fieldStyle=getComputedStyle(viewport);
    const inset=(parseFloat(style.paddingLeft)||0)+(parseFloat(style.paddingRight)||0)+(parseFloat(fieldStyle.borderLeftWidth)||0)+(parseFloat(fieldStyle.borderRightWidth)||0);
    return section.clientWidth?Math.max(280,section.clientWidth-inset):900;
  }
  function freePosition(x,y,wrap=true,height=480,cardWidth=280) {
    const width=workspaceWidth();
    const boxes=cards.map(c=>({...c,...cardSize(c)}));
    for(;;){
      const hit=boxes.find(c=>x<c.x+c.w+18&&x+cardWidth+18>c.x&&y<c.y+c.h+18&&y+height+18>c.y);
      if(!hit)return {x,y};
      if(!wrap){y=hit.y+hit.h+18;continue;}
      x=hit.x+hit.w+18;
      if(x+cardWidth+24>width){
        x=24;
        y=Math.max(y+18,...boxes.filter(c=>c.y<=y+height+18&&c.y+c.h+18>y).map(c=>c.y+c.h+18));
      }
    }
  }
  function cardSize(c){
    const existing=cardElement(c.uid);
    if(existing?.offsetHeight)return {w:existing.offsetWidth,h:existing.offsetHeight};
    const probe=existing?existing.cloneNode(true):renderCard(c);
    probe.style.cssText+=';position:fixed;left:-10000px;top:0;visibility:hidden;pointer-events:none';
    document.body.append(probe);
    const size={w:probe.offsetWidth||280,h:probe.offsetHeight||480};probe.remove();return size;
  }
  function addCard(recipeId,parent,ingredientIndex,deferRender=false) {
    const r=recipes.get(recipeId);if(!r)return;
    let scale=1;
    if(parent) {
      const already=cards.find(c=>c.parent===parent.uid&&c.ingredientIndex===ingredientIndex&&c.recipeId===recipeId);
      if(already){reveal(already);toast('Карточка этого ингредиента уже на поле');return;}
      scale=linkedScale(r,parent,ingredientIndex);
    }
    const base=parent?{x:parent.x+(cardElement(parent.uid)?.offsetWidth||280)+36,y:parent.y}:{x:24,y:24};
    const ing=parent?recipes.get(parent.recipeId).ingredients[ingredientIndex]:null;
    const c={uid:crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(16).slice(2),recipeId,...base,scale,checked:[],done:false,...(parent?{parent:parent.uid,ingredientIndex,outputKey:ing.key,targetAmount:amount(ing,parent.scale)}: {})};
    if(!parent&&r.category==='chem'&&!r.playerGuide&&r.outputs[0]?.unit==='ед.')setTarget(r,c,200);
    const size=cardSize(c);Object.assign(c,freePosition(base.x,base.y,!parent,size.h,size.w));
    cards.push(c);if(deferRender)return c;renderBoard();save();requestAnimationFrame(()=>reveal(c));toast('Добавлено: '+r.name);return c;
  }
  const selectedProduce=new Set();
  try{const stored=JSON.parse(localStorage.getItem('ss14-chef-produce')||'[]');if(Array.isArray(stored))stored.forEach(key=>selectedProduce.add(key));}catch{}
  const produceOptions=window.ChefMenu.stockOptions(data);
  for(const key of selectedProduce)if(!produceOptions.some(p=>p.key===key))selectedProduce.delete(key);
  function renderProduce(){
    const search=$('produce-search').value.toLocaleLowerCase('ru');
    const matches=produceOptions.filter(p=>(p.name+' '+p.group).toLocaleLowerCase('ru').includes(search));
    $('produce-options').innerHTML=[...new Set(matches.map(p=>p.group))].map(group=>`<h4 class="stock-group">${esc(group)}</h4>`+matches.filter(p=>p.group===group).map(p=>`<label><input type="checkbox" data-produce="${esc(p.key)}" ${selectedProduce.has(p.key)?'checked':''}>${esc(p.name)}</label>`).join('')).join('')||'<p>Ничего не найдено</p>';
    $('produce-count').textContent='Выбрано: '+selectedProduce.size;
    $('chef-produce-menu').disabled=!selectedProduce.size;
  }
  function saveProduce(){localStorage.setItem('ss14-chef-produce',JSON.stringify([...selectedProduce]));$('chef-result').textContent='';renderProduce();}
  $('produce-search').addEventListener('input',renderProduce);
  $('produce-options').addEventListener('change',e=>{const key=e.target.dataset.produce;if(!key)return;if(e.target.checked)selectedProduce.add(key);else selectedProduce.delete(key);saveProduce();});
  $('produce-clear').addEventListener('click',()=>{selectedProduce.clear();saveProduce();});
  $('stock-chefvend').addEventListener('click',()=>{produceOptions.filter(p=>p.group==='ШефВенд').forEach(p=>selectedProduce.add(p.key));saveProduce();});
  renderProduce();
  function addChefMenu(fromProduce=false){
    if(fromProduce&&!selectedProduce.size)return;
    const outputs=cards.flatMap(c=>recipes.get(c.recipeId).outputs.map(o=>o.key));
    const menu=window.ChefMenu.pickMenu(data.recipes,10,outputs,Math.random,fromProduce?window.ChefMenu.stockFilter(data,selectedProduce):undefined);
    if(!menu.length){const message='Новых подходящих блюд не найдено. Измените выбор или уберите уже добавленные блюда с поля.';$('chef-result').textContent=message;toast(message);return;}
    menu.forEach(r=>addCard(r.id,null,null,true));renderBoard();
    layout();save();const message=`Меню готово: добавлено ${menu.length} блюд.${menu.length<10?' Это все новые подходящие блюда.':''}`;$('chef-result').textContent=message;toast(message);
  }
  $('chef-menu').addEventListener('click',()=>addChefMenu());
  $('chef-produce-menu').addEventListener('click',()=>addChefMenu(true));
  function reveal(c){if($('workspace-content').hidden)return;const el=cardElement(c.uid);$('viewport').scrollTo({left:Math.max(0,c.x-24),top:Math.max(0,c.y-24),behavior:'smooth'});el?.animate([{outline:'2px solid #c5ed90'},{outline:'2px solid transparent'}],{duration:900});}
  function expand(c,index) {
    const r=recipes.get(c.recipeId),i=r.ingredients[index];
    const variants=(data.byOutput[i.key]||[]).filter(id=>id!==r.id).map(id=>recipes.get(id));
    if(variants.length===1){addCard(variants[0].id,c,index);return;}
    pendingVariant={uid:c.uid,index};$('variant-description').textContent=`${i.name}: выберите один из ${variants.length} рецептов.`;
    $('variant-list').innerHTML=variants.map(v=>`<button class="variant" data-variant="${esc(v.id)}">${esc(v.name)} · ${esc(v.method)}<small>${v.ingredients.map(ing=>`${esc(ing.name)} ${number(ing.amount)} ${ing.unit}`).join(' + ')}${v.conditions.length?'<br>'+esc(v.conditions.join(' · ')):''}</small><code>${esc(v.prototype)}</code></button>`).join('');$('variants').showModal();
  }
  $('categories').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;category=b.dataset.category;subgroup='';limit=36;renderCategories();renderGroups();renderCatalog();});
  $('subgroup').addEventListener('change',e=>{subgroup=e.target.value;limit=36;renderCatalog();});
  $('search').addEventListener('input',e=>{query=e.target.value;limit=36;renderCatalog();});
  $('reset').addEventListener('click',()=>{category='all';subgroup='';query='';limit=36;$('search').value='';renderCategories();renderGroups();renderCatalog();});
  $('load-more').addEventListener('click',()=>{limit+=36;renderCatalog();});
  $('recipes').addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b)addCard(b.dataset.add);});
  $('variant-list').addEventListener('click',e=>{const b=e.target.closest('[data-variant]');if(!b)return;const c=cards.find(c=>c.uid===pendingVariant?.uid);if(c)addCard(b.dataset.variant,c,pendingVariant.index);$('variants').close();});
  $('close-variants').addEventListener('click',()=>$('variants').close());
  document.addEventListener('click',e=>{
    const button=e.target.closest('[data-preview]');if(!button)return;
    const card=cards.find(c=>c.uid===button.closest('.todo')?.dataset.uid);
    previewHistory=[];showPreview(button.dataset.preview,card?.scale||1,true,card?{outputKey:card.outputKey,targetAmount:card.targetAmount}:{});
  });
  $('close-preview').addEventListener('click',()=>$('recipe-preview').close());
  $('recipe-preview').addEventListener('click',e=>{if(e.target===$('recipe-preview')){const rect=e.target.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)e.target.close();}});
  $('preview-back').addEventListener('click',()=>{if(!previewChoosing)previewHistory.pop();const entry=previewHistory.at(-1);if(entry)showPreview(entry.id,entry.scale,false,entry);});
  $('preview-content').addEventListener('change',e=>{
    if(!e.target.matches('[data-preview-output],[data-preview-output-key]'))return;
    const entry=previewHistory.at(-1),r=recipes.get(entry.id);
    const value=e.target.matches('[data-preview-output-key]')?targetValue(r,entry):Number(e.target.value);
    if(e.target.matches('[data-preview-output-key]'))entry.outputKey=e.target.value;
    setTarget(r,entry,value);showPreview(entry.id,entry.scale,false,entry);
  });
  $('preview-content').addEventListener('click',e=>{
    const choice=e.target.closest('[data-preview-choice]');if(choice){showPreview(choice.dataset.previewChoice);return;}
    const b=e.target.closest('[data-preview-ingredient]');if(!b)return;
    const options=(data.byOutput[b.dataset.previewIngredient]||[]).map(id=>recipes.get(id));
    if(options.length===1){showPreview(options[0].id);return;}
    $('preview-content').innerHTML='<p>Выберите способ приготовления:</p>'+options.map(r=>`<button class="variant" data-preview-choice="${esc(r.id)}">${esc(r.name)} · ${esc(r.method)}<small>${r.ingredients.map(i=>esc(i.name)).join(' + ')}</small></button>`).join('');
    $('preview-back').hidden=false;
    previewChoosing=true;
  });
  $('toggle-workspace').addEventListener('click',()=>{
    const opening=$('workspace-content').hidden;
    setWorkspaceCollapsed(!opening);
    if(opening)$('workspace-content').closest('.workspace').scrollIntoView({behavior:'smooth',block:'start'});
  });
  $('board').addEventListener('click',e=>{const el=e.target.closest('.todo');if(!el)return;const c=cards.find(c=>c.uid===el.dataset.uid);if(e.target.closest('[data-action="remove"]')){cards=cards.filter(item=>item!==c);renderBoard();save();}const b=e.target.closest('[data-expand]');if(b)expand(c,Number(b.dataset.expand));});
  $('board').addEventListener('change',e=>{
    const el=e.target.closest('.todo');if(!el)return;const c=cards.find(c=>c.uid===el.dataset.uid);
    if(e.target.matches('[data-ingredient]')){const index=Number(e.target.dataset.ingredient);c.checked=e.target.checked?[...new Set([...c.checked,index])]:c.checked.filter(i=>i!==index);}
    if(e.target.matches('[data-chem-check]')){const key=e.target.dataset.chemCheck;c.checked=e.target.checked?[...new Set([...c.checked,key])]:c.checked.filter(i=>i!==key);}
    if(e.target.matches('[data-chem-step]')){const key=e.target.dataset.chemStep;c.checked=e.target.checked?[...new Set([...c.checked,key])]:c.checked.filter(i=>i!==key);e.target.closest('.chem-stage').classList.toggle('is-complete',e.target.checked);}
    if(e.target.matches('[data-done]')){c.done=e.target.checked;el.classList.toggle('done',c.done);}
    if(e.target.matches('[data-output],[data-output-key]')){
      const r=recipes.get(c.recipeId),value=e.target.matches('[data-output-key]')?targetValue(r,c):Number(e.target.value);
      if(e.target.matches('[data-output-key]'))c.outputKey=e.target.value;
      setTarget(r,c,value);c.checked=[];c.done=false;
      updateChildren(c);
      renderBoard();
    }save();
  });
  $('board').addEventListener('toggle',layout,true);
  document.addEventListener('click',e=>{const button=e.target.closest('[data-chem-volume]');if(!button)return;const input=button.closest('.output-settings').querySelector('[data-output],[data-preview-output]');input.value=button.dataset.chemVolume;input.dispatchEvent(new Event('change',{bubbles:true}));});
  let drag=null;
  $('board').addEventListener('pointerdown',e=>{const header=e.target.closest('.todo-header');if(!header||e.target.closest('button')||e.button!==0)return;const el=header.closest('.todo'),c=cards.find(c=>c.uid===el.dataset.uid);drag={c,el,header,x:e.clientX,y:e.clientY,startX:c.x,startY:c.y,scrollX:$('viewport').scrollLeft,scrollY:$('viewport').scrollTop};el.style.zIndex=++z;el.classList.add('dragging');header.setPointerCapture(e.pointerId);e.preventDefault();});
  $('board').addEventListener('pointermove',e=>{if(!drag)return;const {c,el}=drag,v=$('viewport'),rect=v.getBoundingClientRect();if(e.clientX>rect.right-35)v.scrollLeft+=15;if(e.clientX<rect.left+35)v.scrollLeft-=15;if(e.clientY>rect.bottom-35)v.scrollTop+=15;if(e.clientY<rect.top+35)v.scrollTop-=15;c.x=Math.max(0,Math.min(50000,drag.startX+e.clientX-drag.x+v.scrollLeft-drag.scrollX));c.y=Math.max(0,Math.min(50000,drag.startY+e.clientY-drag.y+v.scrollTop-drag.scrollY));el.style.left=c.x+'px';el.style.top=c.y+'px';layout();});
  function stopDrag(){if(!drag)return;drag.el.classList.remove('dragging');drag=null;save();}
  $('board').addEventListener('pointerup',stopDrag);$('board').addEventListener('pointercancel',stopDrag);$('board').addEventListener('lostpointercapture',stopDrag);
  $('board').addEventListener('keydown',e=>{if(!e.target.matches('.todo-header')||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const el=e.target.closest('.todo'),c=cards.find(c=>c.uid===el.dataset.uid),step=e.shiftKey?50:10;c.x=Math.max(0,c.x+(e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0));c.y=Math.max(0,c.y+(e.key==='ArrowDown'?step:e.key==='ArrowUp'?-step:0));el.style.left=c.x+'px';el.style.top=c.y+'px';layout();save();});
  $('arrange').addEventListener('click',()=>{let x=24,y=24,rowHeight=0;const width=workspaceWidth();cards.forEach(c=>{const {w,h}=cardSize(c);if(x+w+24>width&&x>24){x=24;y+=rowHeight+18;rowHeight=0;}c.x=x;c.y=y;x+=w+18;rowHeight=Math.max(rowHeight,h);});renderBoard();save();if(!$('workspace-content').hidden)$('viewport').scrollTo({left:0,top:0,behavior:'smooth'});});
  $('clear-done').addEventListener('click',()=>{const count=cards.filter(c=>c.done).length;cards=cards.filter(c=>!c.done);renderBoard();save();toast(count?`Убрано карточек: ${count}`:'Пока нет готовых карточек');});
  $('clear').addEventListener('click',()=>{if(cards.length)$('clear-dialog').showModal();});
  $('cancel-clear').addEventListener('click',()=>$('clear-dialog').close());
  $('confirm-clear').addEventListener('click',()=>{cards=[];renderBoard();save();$('clear-dialog').close();});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!document.querySelector('dialog[open]')&&!e.target.matches('input,textarea,select')){e.preventDefault();$('search').focus();}});
  try{const height=Number(localStorage.getItem('ss14-workspace-height'));if(Number.isFinite(height)&&height>=120){$('viewport').style.height=height+'px';$('workspace-height').value=height;}}catch{}
  if(!$('workspace-height').value)$('workspace-height').value=475;
  new ResizeObserver(()=>{rememberWorkspaceHeight();requestAnimationFrame(layout);}).observe($('viewport'));
  window.addEventListener('resize',rememberWorkspaceHeight);
  $('total').textContent=data.recipes.length+' рецептов';
  renderCategories();renderGroups();renderCatalog();renderBoard();
  try{setWorkspaceCollapsed(localStorage.getItem('ss14-workspace-collapsed')==='true');}catch{}
})();
