/* Pure recipe expansion shared by the interface and tests. */
(function (scope) {
  function expand(recipe, scale, data) {
    const recipes = new Map(data.recipes.map(r => [r.id, r]));
    const base = new Set(data.baseReagents || []);
    const totals = new Map(), steps = [], warnings = new Set();
    function leaf(item, quantity, via, reason) {
      const key = item.key + (item.catalyst ? ':catalyst' : ':consumed');
      const entry = totals.get(key) || { ...item, amount: 0, checkKey: 'chem:' + key, via: [], reason };
      entry.amount = item.catalyst ? Math.max(entry.amount, quantity) : entry.amount + quantity;
      if (via && !entry.via.includes(via)) entry.via.push(via);
      totals.set(key, entry);
      if (reason) warnings.add(reason);
    }
    function visit(r, multiplier, seen, via) {
      for (const item of r.ingredients) {
        const quantity = item.catalyst ? item.amount : item.amount * multiplier;
        const candidates = (data.byOutput[item.key] || []).map(id => recipes.get(id))
          .filter(p => p?.id.startsWith('reaction:') && p.outputs.some(o => o.key === item.key));
        if (item.catalyst || base.has(item.id) || !candidates.length) { leaf(item, quantity, via); continue; }
        const available = candidates.filter(p => !seen.has(p.id));
        available.sort((a, b) => Number(b.prototype === item.id) - Number(a.prototype === item.id) || a.ingredients.length - b.ingredients.length || a.id.localeCompare(b.id));
        const next = available[0];
        if (!next) { leaf(item, quantity, via, 'Циклическая цепочка: ' + item.name + ' потребуется в готовом виде.'); continue; }
        const result = next.outputs.find(o => o.key === item.key);
        let batch = quantity / result.amount;
        if (next.quantized || next.ingredients.some(i => i.unit === 'шт.')) batch = Math.ceil(batch);
        visit(next, batch, new Set([...seen, next.id]), item.name);
        steps.push({ recipe: next, scale: batch, requested: quantity, product: item, alternatives: candidates.length });
      }
    }
    visit(recipe, scale, new Set([recipe.id]), 'Финальное смешивание');
    return { ingredients: [...totals.values()], steps, warnings: [...warnings] };
  }
  scope.WorkbenchChemistry = { expand };
})(typeof module === 'object' && module.exports ? module.exports : window);
