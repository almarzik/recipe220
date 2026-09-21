// Read-only importer for the checked-out SS14 prototypes. No network requests.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const YAML = require('yaml');
const root = path.resolve(__dirname, '..');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]).sort();
const relative = p => path.relative(root, p).replaceAll('\\', '/');
const locales = {};
for (const lang of ['en-US', 'ru-RU']) {
  for (const file of walk(path.join(root, 'Resources/Locale', lang)).filter(f => f.endsWith('.ftl'))) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/^([\w-]+)\s*=\s*(.+)$/gm)) {
      const value = match[2].trim();
      if (!value.includes('{')) locales[match[1]] = value;
    }
  }
}
const prototypes = new Map();
let fileCount = 0;
for (const file of walk(path.join(root, 'Resources/Prototypes')).filter(f => /\.ya?ml$/.test(f))) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r/g, '');
  // Preserve Robust's custom YAML type names as explicit fields for effect inspection.
  const cleaned = raw.replace(/!type:([\w]+)/g, '!$1');
  const tags = [...new Set([...cleaned.matchAll(/!([A-Za-z][\w]+)/g)].map(m => m[1]))];
  const customTags = tags.flatMap(tag => [
    { tag: '!' + tag, collection: 'map', resolve(map) { map.items.push(new YAML.Pair('__effect', tag)); return map; } },
    { tag: '!' + tag, resolve(value) { return value == null || value === '' ? { __effect: tag } : value; } }
  ]);
  const doc = YAML.parseDocument(cleaned, { customTags, uniqueKeys: false, logLevel: 'silent' });
  if (doc.errors.length) throw new Error(relative(file) + ': ' + doc.errors.map(e => e.message).join('\n'));
  const items = doc.toJS({ maxAliasCount: 1000 });
  if (!Array.isArray(items)) continue;
  fileCount++;
  for (const p of items) if (p?.id && p?.type) {
    const key = p.type + ':' + p.id;
    if (prototypes.has(key)) throw new Error('Duplicate prototype: ' + key);
    prototypes.set(key, { ...p, _source: relative(file) });
  }
}
const entities = new Map([...prototypes.values()].filter(p => p.type === 'entity').map(p => [p.id, p]));
const reagents = new Map([...prototypes.values()].filter(p => p.type === 'reagent').map(p => [p.id, p]));
const cache = new Map();
function entity(id, seen = new Set()) {
  if (cache.has(id)) return cache.get(id);
  const p = entities.get(id);
  if (!p || seen.has(id)) return { id, components: [] };
  seen = new Set([...seen, id]);
  let result = { components: [] };
  const parents = p.parent ? (Array.isArray(p.parent) ? p.parent : [p.parent]) : [];
  for (const parent of parents.toReversed()) {
    const inherited = entity(parent, seen);
    const merged = new Map(result.components.map(c => [c.type, c]));
    for (const c of inherited.components || []) merged.set(c.type, { ...merged.get(c.type), ...c });
    result = { ...result, ...inherited, components: [...merged.values()] };
  }
  const components = new Map(result.components.map(c => [c.type, c]));
  for (const c of p.components || []) components.set(c.type, { ...components.get(c.type), ...c });
  result = { ...result, ...p, abstract: !!p.abstract, components: [...components.values()] };
  cache.set(id, result);
  return result;
}
function name(kind, id) {
  if (kind === 'reagent') { const p = reagents.get(id); return locales[p?.name] || p?.name || id; }
  return locales['ent-' + id] || entity(id).name || id;
}
const ingredient = (kind, id, amount = 1, extra = {}) => ({ key: kind + ':' + id, id, name: name(kind, id), amount, unit: kind === 'reagent' ? 'ед.' : 'шт.', ...extra });
const recipes = [];
const groups = { medicine:'Медицина',drinks:'Коктейли и напитки',food:'Еда и основы',chemicals:'Химические вещества',pyrotechnic:'Пиротехника',cleaning:'Очистка',botany:'Ботаника',biological:'Биология',gas:'Газы',fun:'Особые реакции',single_reagent:'Преобразования',soap:'Мыло',nacrotics:'Наркотические вещества',narcotics:'Наркотические вещества' };
const mealGroups = { Breads:'Хлеб и выпечка',Moth:'Для ниан',Savory:'Основные блюда',Sweet:'Десерты',Pizza:'Пицца',Pies:'Пироги',Cakes:'Торты',Other:'Другие блюда',Burgers:'Бургеры',Soups:'Супы',Soup:'Супы',Cake:'Торты',Dessert:'Десерты',Breakfast:'Завтраки',BarsAndCookies:'Батончики и печенье',Salad:'Салаты',Pie:'Пироги',Pasta:'Паста',Secret:'Секретные рецепты',Medicinal:'Медицинская кулинария' };
const mixerNames = { Shake:'Встряхнуть в шейкере',Stir:'Размешать',Mix:'Смешать',Centrifuge:'Центрифуга',Electrolysis:'Электролиз',Holy:'Освящение' };
function add(r) { if (!r.ingredients.length || !r.outputs.length) return; recipes.push(r); }
for (const p of prototypes.values()) {
  if (p.type === 'reaction') {
    const outputs = Object.entries(p.products || {}).map(([id, amount]) => ingredient('reagent', id, amount));
    for (const effect of p.effects || []) if (effect.__effect === 'SpawnEntity' && effect.entity) outputs.push(ingredient('entity', effect.entity, effect.number ?? 1));
    // Effects-only reactions remain discoverable, but never masquerade as reagent producers.
    const fileGroup = path.basename(p._source, '.yml');
    const category = fileGroup === 'drinks' ? 'bar' : fileGroup === 'food' || outputs.some(o => o.id.startsWith('Food')) ? 'food' : 'chem';
    const conditions = [];
    if (p.minTemp != null) conditions.push('от ' + p.minTemp + ' K');
    if (p.maxTemp != null) conditions.push('до ' + p.maxTemp + ' K');
    for (const mixer of p.requiredMixerCategories || []) conditions.push(mixerNames[mixer] || mixer);
    if (p.quantized) conditions.push('Только полные порции');
    const effects = (p.effects || []).filter(e => e.__effect !== 'SpawnEntity' || e.conditions || e.probability != null);
    const ingredients = Object.entries(p.reactants || {}).map(([id, item]) => ingredient('reagent', id, item.amount ?? 1, { catalyst: !!item.catalyst }));
    const first = outputs[0];
    const recipe = { id:'reaction:' + p.id, prototype:p.id, name:first?.name || locales['reaction-name-' + p.id] || p.id, category, group:groups[fileGroup] || 'Особые реакции', method:'Смешивание', conditions, ingredients, outputs, source:p._source, effects:effects.length ? YAML.stringify(effects) : '', quantized:!!p.quantized, note:effects.length ? 'Есть дополнительные эффекты или условия. См. подробности из прототипа.' : '' };
    if (!outputs.length && ingredients.length) recipes.push(recipe); else add(recipe);
  }
  if (p.type === 'microwaveMealRecipe') {
    add({ id:'microwave:' + p.id, prototype:p.id, name:name('entity',p.result), category:'food', group:mealGroups[p.group] || p.group || 'Другие блюда', method:'Микроволновка', conditions:[(p.time ?? 5) + ' с'], ingredients:[...Object.entries(p.solids || {}).map(([id,n])=>ingredient('entity',id,n)),...Object.entries(p.reagents || {}).map(([id,n])=>ingredient('reagent',id,n))], outputs:[ingredient('entity',p.result)], source:p._source, note:p.secretRecipe ? 'Секретный рецепт в прототипах игры.' : '' });
  }
}
for (const id of entities.keys()) {
  const p = entity(id);
  if (p.abstract) continue;
  for (const c of p.components) {
    if (c.type === 'SliceableFood' && c.slice) add({ id:'slice:' + id, prototype:id, name:name('entity',c.slice), category:'food',group:'Подготовка ингредиентов',method:'Нарезка',conditions:['Нож'],ingredients:[ingredient('entity',id)],outputs:[ingredient('entity',c.slice,c.count ?? 5)],source:p._source });
    if (c.type === 'FoodProcessorIngredient' && c.result) add({ id:'processor:' + id,prototype:id,name:name('entity',c.result),category:'food',group:'Подготовка ингредиентов',method:'Кухонный комбайн',conditions:[],ingredients:[ingredient('entity',id)],outputs:[ingredient('entity',c.result,c.resultCount ?? 1)],source:p._source });
    if (c.type === 'Extractable') {
      const container = p.components.find(component=>component.type==='SolutionContainerManager');
      const produce = p.components.some(component=>component.type==='Produce');
      for (const [mode, solution] of [['juice',c.juiceSolution],['grind',container?.solutions?.[c.grindableSolutionName]]]) {
        const outputs = (solution?.reagents || []).map(item=>ingredient('reagent',item.ReagentId,item.Quantity));
        if (!outputs.length || (mode==='grind' && !produce)) continue;
        add({id:mode+':'+id,prototype:id,name:outputs[0].name+' · '+name('entity',id),category:mode==='juice'?'bar':'food',group:mode==='juice'?'Соки':'Измельчение продуктов',method:mode==='juice'?'Отжим сока':'Измельчитель',conditions:[],ingredients:[ingredient('entity',id)],outputs,source:p._source,note:'Базовый выход из прототипа. Фактический состав и объём зависят от состояния продукта'+(produce?' и характеристик растения.':'.')});
      }
    }
  }
}
const tools = { Rolling:'Скалка',Cutting:'Нож',Slicing:'Нож',Welding:'Сварка' };
for (const graph of prototypes.values()) {
  if (graph.type !== 'constructionGraph' || !/\/food\//i.test(graph._source)) continue;
  const nodes = new Map((graph.graph || []).map(n => [n.node,n]));
  for (const node of nodes.values()) {
    const origins = node.entity ? [node.entity] : [...entities.keys()].filter(id => { const p = entity(id); return !p.abstract && p.components.some(c => c.type === 'Construction' && c.graph === graph.id && (c.node || 'start') === node.node); });
    for (const origin of origins) {
      function follow(current, ingredients, conditions, seen) {
        for (const edge of current.edges || []) {
          if (seen.has(edge.to)) continue;
          const target = nodes.get(edge.to); if (!target) continue;
          const nextIngredients = [...ingredients]; const nextConditions = [...conditions]; let unsupported = false;
          for (const step of edge.steps || []) {
            if (step.prototype) nextIngredients.push(ingredient('entity',step.prototype,step.amount ?? 1));
            else if (step.tag || step.material) { unsupported = true; break; }
            if (step.tool) nextConditions.push(tools[step.tool] || step.tool);
            if (step.minTemperature != null) nextConditions.push('от ' + step.minTemperature + ' K');
            if (step.maxTemperature != null) nextConditions.push('до ' + step.maxTemperature + ' K');
            if (step.doAfter) nextConditions.push(step.doAfter + ' с');
          }
          if (unsupported) continue;
          if (target.entity) add({ id:`graph:${graph.id}:${origin}:${node.node}:${edge.to}`,prototype:graph.id,name:name('entity',target.entity),category:'food',group:'Подготовка ингредиентов',method:nextConditions.some(s => s.endsWith(' K')) ? 'Нагрев' : 'Ручное приготовление',conditions:nextConditions,ingredients:nextIngredients,outputs:[ingredient('entity',target.entity)],source:graph._source });
          else follow(target,nextIngredients,nextConditions,new Set([...seen,edge.to]));
        }
      }
      follow(node,[ingredient('entity',origin)],[],new Set([node.node]));
    }
  }
}
recipes.sort((a,b)=>a.name.localeCompare(b.name,'ru') || a.id.localeCompare(b.id));
const byOutput = {};
recipes.forEach(r => r.outputs.forEach(o => { if (!r.ingredients.some(i => i.key === o.key)) (byOutput[o.key] ||= []).push(r.id); }));
let revision = 'unknown'; try { revision = execFileSync('git',['rev-parse','--short','HEAD'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim(); } catch {}
const images = require('./build-thumbnails.cjs')({ root, recipes, entities, reagents });
const dispenser = entity('ChemDispenser').components.find(c=>c.type==='EntityTableContainerFill');
const baseReagents = new Set();
function dispenserContents(node) {
  if (!node || typeof node !== 'object') return;
  if (node.id && entities.has(node.id)) {
    const solution = entity(node.id).components.find(c=>c.type==='SolutionContainerManager');
    for (const s of Object.values(solution?.solutions || {})) for (const r of s.reagents || []) baseReagents.add(r.ReagentId);
  }
  for (const value of Object.values(node)) if (typeof value === 'object') dispenserContents(value);
}
dispenserContents(dispenser?.containers);
const botany = require('./build-botany.cjs')({ prototypes, reagents, locales, ingredient });
const result = { generatedAt:new Date().toISOString(), revision, fileCount, recipes, byOutput, images, baseReagents:[...baseReagents], botany };
fs.writeFileSync(path.join(__dirname,'recipes.js'),'// Generated by build-data.cjs from local game files.\nwindow.RECIPE_DATA = ' + JSON.stringify(result) + ';\n');
fs.writeFileSync(path.join(__dirname,'data-summary.json'),JSON.stringify({generatedAt:result.generatedAt,revision,fileCount,total:recipes.length,categories:Object.fromEntries(['chem','food','bar'].map(c=>[c,recipes.filter(r=>r.category===c).length])),linkedIngredients:recipes.flatMap(r=>r.ingredients).filter(i=>byOutput[i.key]).length},null,2)+'\n');
console.log(fs.readFileSync(path.join(__dirname,'data-summary.json'),'utf8'));
