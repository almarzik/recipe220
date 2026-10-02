(()=>{
  'use strict';
  function render({m,recipe,targets,injuries,injury,conditions}){
    const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const num=n=>new Intl.NumberFormat('ru-RU').format(n);
    return `<article class="med-card" data-med-id="${esc(m.id)}"><span class="med-color" style="background:${esc(m.color)}" role="img" aria-label="Цвет лекарства: ${esc(m.color)}" title="Цвет лекарства: ${esc(m.color)}"></span><div class="med-targets">${(targets[m.id]||[]).map(t=>`<span class="${t===injury?'is-target':''}">${injuries[t]}</span>`).join('')}</div><div class="med-name-row"><h3>${esc(m.name)}</h3><span class="med-kind">${m.level==='base'?'База':'Продвинутая'}</span></div><p class="med-treats">${esc(m.treats)}</p>${conditions[m.id]?`<p class="med-condition">${conditions[m.id]}</p>`:''}<div class="med-card-footer">${recipe?`<button class="secondary" data-preview="${esc(recipe)}">Рецепт ↗</button>`:'<span class="med-meta">Нет рецепта в каталоге</span>'}<span class="med-limit">${m.overdose===null?'Передоз: порог не задан':'Передоз от '+num(m.overdose)+' ед.'}</span></div><details class="med-details"><summary>Особенности и побочки</summary><p>${esc(m.note)}</p>${m.harm?`<p><b>При передозировке:</b> ${esc(m.harm)}</p>`:''}<p class="source">${esc(m.id)} · ${esc(m.source)}</p></details></article>`;
  }
  window.MedicineCard={render};
})();
