'use strict';
(() => {
  const guide=window.PLAYER_GUIDES?.[0];
  if(!guide)return;
  const $=id=>document.getElementById(id);
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const recipes=new Set(window.RECIPE_DATA.recipes.map(r=>r.id));
  const key='ss14-player-guide-'+guide.id;
  let checked=new Set(),filter='all',query='';
  try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))checked=new Set(saved.filter(v=>typeof v==='string'));}catch{}
  const normalize=value=>String(value).toLowerCase().replaceAll('ё','е');
  function matches(value){return normalize(query).trim().split(/\s+/).filter(Boolean).every(word=>normalize(value).includes(word));}
  function check(id,text){return `<label class="guide-check"><input type="checkbox" data-guide-check="${esc(id)}" ${checked.has(id)?'checked':''}><span>${esc(text)}</span></label>`;}
  function render(){
    const sections=guide.sections.filter(s=>(filter==='all'||filter===s.id)&&matches([s.title,s.subtitle,...s.blocks.flatMap(b=>[b.title,...b.paragraphs])].join(' ')));
    const showStock=(filter==='all'||filter==='stock')&&(!query||matches('Закупка '+guide.stock.map(s=>s.name).join(' ')));
    $('player-guide').innerHTML=`<header class="guide-intro"><div><span class="guide-tag">МЕТОДИЧКА ИГРОКА</span><h3>${esc(guide.title)}</h3><p>Автор: <b>${esc(guide.author)}</b></p></div><a class="secondary" href="${esc(guide.source)}" download="химия.txt">Скачать оригинал ↓</a></header><p class="guide-editor-note">Авторские количества и порядок сохранены. Это личная методичка, а не расчёт из прототипов: округления и неоднозначности сверяйте через «Рецепт сборки». Нумерация сохранена — этапа 7 в оригинале нет.</p><div class="guide-layout"><aside class="guide-nav" aria-label="Оглавление методички"><button data-guide-filter="all" aria-pressed="${filter==='all'}">Вся методичка</button><button data-guide-filter="stock" aria-pressed="${filter==='stock'}">Закупка реагентов</button>${guide.sections.map(s=>`<button data-guide-filter="${s.id}" aria-pressed="${filter===s.id}"><small>${s.id==='end'?'Финал':'Этап '+s.id}</small>${esc(s.title)}</button>`).join('')}<p id="guide-progress">Отмечено: ${checked.size}</p></aside><div class="guide-sections">${showStock?`<details class="guide-section" open><summary><span>Закупка реагентов</span><small>${guide.stock.length} позиций</small></summary><div class="guide-section-body"><div class="guide-table-wrap"><table class="guide-stock"><thead><tr><th>Реагент</th><th>Унц. по автору</th><th>Кувшины / отметки</th></tr></thead><tbody>${guide.stock.map((s,i)=>`<tr><td>${check('stock:'+i,s.name)}</td><td>${s.amount}</td><td>${esc(s.jugs)}</td></tr>`).join('')}</tbody></table></div><p class="guide-small">${esc(guide.stockNote)}</p></div></details>`:''}${sections.map(s=>`<details class="guide-section" ${query||filter!=='all'||s.id==='1'?'open':''}><summary><span><small>${s.id==='end'?'Финал':'Этап '+s.id}</small>${esc(s.title)}</span><small>${s.blocks.length} блоков</small></summary><div class="guide-section-body"><p class="guide-subtitle">${esc(s.subtitle)}</p>${s.blocks.map((b,bi)=>`<article class="guide-recipe"><div class="guide-recipe-heading"><h4>${esc(b.title)}</h4><div class="guide-recipe-links">${b.recipeId&&recipes.has(b.recipeId)?`<button class="secondary" data-preview="${esc(b.recipeId)}">Рецепт сборки ↗</button>`:''}${b.batch?`<button class="add-recipe" data-guide-add="${esc(b.cardId)}">+ Партия автора на поле</button>`:''}</div></div>${b.title==='Пунктураз'?'<p class="guide-ambiguity">В оригинале неоднозначно повторено «100 в химмастер». Формулировка оставлена ниже; точный состав смотрите в рецепте сборки.</p>':''}<ol class="guide-instructions">${b.paragraphs.flatMap((p,pi)=>p.split(/(?<=[.!?])\s+(?=[А-ЯЁ])/u).map((sentence,si)=>`<li>${check(s.id+':'+bi+':'+pi+':'+si,sentence)}</li>`)).join('')}</ol></article>`).join('')}</div></details>`).join('')}${!showStock&&!sections.length?'<div class="guide-empty"><h3>Ничего не найдено</h3><p>Попробуйте другое название или откройте всю методичку.</p></div>':''}</div></div>`;
  }
  $('player-search').addEventListener('input',e=>{query=e.target.value;filter='all';render();});
  $('player-guide').addEventListener('click',e=>{
    const nav=e.target.closest('[data-guide-filter]');if(nav){filter=nav.dataset.guideFilter;query='';$('player-search').value='';render();return;}
    const add=e.target.closest('[data-guide-add]');if(add)document.dispatchEvent(new CustomEvent('workbench:add-recipe',{detail:{id:add.dataset.guideAdd}}));
  });
  $('player-guide').addEventListener('change',e=>{
    if(!e.target.matches('[data-guide-check]'))return;
    const id=e.target.dataset.guideCheck;if(e.target.checked)checked.add(id);else checked.delete(id);
    try{localStorage.setItem(key,JSON.stringify([...checked]));}catch{}
    $('guide-progress').textContent='Отмечено: '+checked.size;
  });
  render();
})();
