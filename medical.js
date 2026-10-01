(()=>{
  'use strict';
  const data=window.MEDICAL_DATA,root=document.getElementById('medical');if(!data||!root)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm=s=>s.toLocaleLowerCase('ru').replaceAll('ё','е');
  const num=n=>new Intl.NumberFormat('ru-RU').format(n);
  const injuries={piercing:'Уколы',blunt:'Ушибы',slash:'Порезы',heat:'Ожоги',shock:'Электричество',cold:'Холод',caustic:'Кислота',poison:'Токсины',air:'Удушье',bloodloss:'Урон от кровопотери',bleed:'Кровотечение',blood:'Мало крови',radiation:'Радиация',cell:'Клеточный урон',crit:'Крит'};
  const brute=['piercing','blunt','slash'],burn=['heat','shock','cold','caustic'];
  // Match treatment effects, not adverse effects or words in warnings.
  const targets={Bicaridine:brute,Dermaline:['heat','shock','cold'],Dylovene:['poison'],Dexalin:['air','bloodloss'],Inaprovaline:['crit','bleed'],Epinephrine:['crit'],Saline:['blood'],TranexamicAcid:['bleed'],Tricordrazine:[...brute,...burn,'poison'],Hyronalin:['radiation'],Bruizine:['blunt'],Lacerinol:['slash'],Puncturase:['piercing'],Pyrazine:['heat'],Insuzine:['shock'],Leporazine:['cold'],Sigynate:['caustic'],DexalinPlus:['air','bloodloss'],Diphenhydramine:['poison'],Arithrazine:['radiation'],Cryoxadone:[...brute,...burn,'poison','radiation','air','bloodloss'],Doxarubixadone:['cell'],Phalanximine:['cell'],Omnizine:[...brute,...burn,'poison','radiation','air','bloodloss']};
  const conditions={Tricordrazine:'Только вне крита',Epinephrine:'Лечение — только в крите',Inaprovaline:'От удушья — только в крите',Cryoxadone:'Нужен холод: тело ≤ 213 K',Doxarubixadone:'Нужен холод: тело ≤ 213 K'};
  let level='all',injury='';
  root.innerHTML=`<header class="med-heading"><div><p class="eyebrow">МЕДИЦИНСКИЙ ОТДЕЛ / SS220</p><h2 id="medical-title">Что лечим?</h2><p>Выберите повреждение — сразу увидите подходящие лекарства.</p></div><span class="med-total">${data.medicines.length} препарата</span></header>
  <div class="med-injuries" role="group" aria-label="Тип повреждения"><button data-med-injury="" aria-pressed="true">Все</button>${Object.entries(injuries).map(([id,name])=>`<button data-med-injury="${id}" aria-pressed="false">${name}</button>`).join('')}</div>
  <div class="med-toolbar"><div class="med-levels" role="group" aria-label="Уровень справочника"><button class="secondary" data-med-level="all" aria-pressed="true">Все лекарства</button><button class="secondary" data-med-level="base" aria-pressed="false">База</button><button class="secondary" data-med-level="advanced" aria-pressed="false">Продвинутая</button></div><label class="med-search-label"><span class="med-sr-only">Найти лекарство или повреждение</span><input id="med-search" type="search" placeholder="Название или повреждение…"></label><button class="quiet" id="med-reset">Сбросить</button></div>
  <p id="med-count" class="med-meta" role="status" aria-live="polite"></p><div id="med-results" class="med-grid"></div>
  <details class="med-help"><summary>Как читать пороги передозировки</summary><p>Это количество одного реагента в организме, не размер шприца. Учитывайте уже введённое лекарство. «От 10 ед.» включает ровно 10. Порог не является рекомендуемой дозой. «Порог не задан» не означает отсутствие побочных эффектов.</p></details><p class="med-meta">Игровой справочник SS220 · сверено с локальным билдом ${esc(data.checked)}. Эффект зависит от метаболизма персонажа.</p>`;
  const $=id=>root.querySelector('#'+id);
  function render(){
    const words=norm($('med-search').value).trim().split(/\s+/).filter(Boolean);
    const items=data.medicines.filter(m=>(level==='all'||m.level===level)&&(!injury||targets[m.id]?.includes(injury))&&words.every(w=>norm([m.name,m.id,m.treats,...(targets[m.id]||[]).map(t=>injuries[t])].join(' ')).includes(w)));
    if(injury)items.sort((a,b)=>Number(!!conditions[a.id])-Number(!!conditions[b.id])||(targets[a.id]?.length||0)-(targets[b.id]?.length||0));
    root.querySelectorAll('[data-med-injury]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.medInjury===injury)));
    root.querySelectorAll('[data-med-level]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.medLevel===level)));
    $('med-count').textContent=`${injury?injuries[injury]:'Все повреждения'} · ${items.length} препаратов${injury?' · сначала наиболее узкое назначение':''}`;
    $('med-results').innerHTML=items.map(m=>{
      const recipe=(window.RECIPE_DATA?.byOutput['reagent:'+m.id]||[])[0];
      return `<article class="med-card" data-med-id="${esc(m.id)}"><span class="med-color" style="background:${esc(m.color)}" role="img" aria-label="Цвет лекарства: ${esc(m.color)}" title="Цвет лекарства: ${esc(m.color)}"></span><div class="med-targets">${(targets[m.id]||[]).map(t=>`<span class="${t===injury?'is-target':''}">${injuries[t]}</span>`).join('')}</div><div class="med-name-row"><h3>${esc(m.name)}</h3><span class="med-kind">${m.level==='base'?'База':'Продвинутая'}</span></div><p class="med-treats">${esc(m.treats)}</p>${conditions[m.id]?`<p class="med-condition">${conditions[m.id]}</p>`:''}<div class="med-card-footer">${recipe?`<button class="secondary" data-preview="${esc(recipe)}">Рецепт ↗</button>`:'<span class="med-meta">Нет рецепта в каталоге</span>'}<span class="med-limit">${m.overdose===null?'Передоз: порог не задан':'Передоз от '+num(m.overdose)+' ед.'}</span></div><details class="med-details"><summary>Особенности и побочки</summary><p>${esc(m.note)}</p>${m.harm?`<p><b>При передозировке:</b> ${esc(m.harm)}</p>`:''}<p class="source">${esc(m.id)} · ${esc(m.source)}</p></details></article>`;
    }).join('')||'<div class="med-empty"><h3>Нет подходящих лекарств</h3><p>Выберите «Все лекарства» или сбросьте фильтры.</p></div>';
  }
  root.addEventListener('click',e=>{const b=e.target.closest('[data-med-level],[data-med-injury]');if(!b)return;if(b.hasAttribute('data-med-injury')){injury=b.dataset.medInjury;level='all';$('med-search').value='';}else level=b.dataset.medLevel;render();});
  $('med-search').addEventListener('input',render);
  $('med-reset').addEventListener('click',()=>{level='all';injury='';$('med-search').value='';render();});render();
})();
