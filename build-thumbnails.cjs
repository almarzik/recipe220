const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

module.exports = function buildThumbnails({ root, recipes, entities, reagents, creditsFile = 'credits.json' }) {
  const output = path.join(__dirname, 'assets');
  fs.mkdirSync(output, { recursive: true });
  const images = {}, credits = new Map(), spriteCache = new Map();
  function sprite(id, seen = new Set()) {
    if (spriteCache.has(id)) return spriteCache.get(id);
    if (seen.has(id)) return {};
    seen = new Set([...seen, id]);
    const p = entities.get(id) || {};
    const parents = p.parent ? (Array.isArray(p.parent) ? p.parent : [p.parent]) : [];
    let result = {};
    for (const parent of parents.toReversed()) result = { ...result, ...sprite(parent, seen) };
    const own = p.components?.find(c => c.type === 'Sprite');
    if (own) {
      result = { ...result, ...own };
      if (own.state && !own.layers) delete result.layers;
      if (own.layers && !own.state) delete result.state;
    }
    spriteCache.set(id, result);
    return result;
  }
  function layerImage(layer, base) {
    const rsi = layer.sprite || base.sprite, state = layer.state || base.state;
    if (!rsi || !state || layer.visible === false) return null;
    const folder = path.resolve(root, 'Resources/Textures', rsi.replace(/^\//, ''));
    const file = path.join(folder, state + '.png'), metaFile = path.join(folder, 'meta.json');
    if (!fs.existsSync(file) || !fs.existsSync(metaFile)) return null;
    const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8').replace(/^\uFEFF/, ''));
    const bytes = fs.readFileSync(file);
    const filename = createHash('sha256').update(path.relative(root, file)).digest('hex').slice(0, 20) + '.png';
    fs.copyFileSync(file, path.join(output, filename));
    credits.set(rsi, { source: 'Resources/Textures/' + rsi, license: meta.license, copyright: meta.copyright });
    return { src: 'assets/' + filename, width: meta.size.x, height: meta.size.y, sheetWidth: bytes.readUInt32BE(16), sheetHeight: bytes.readUInt32BE(20) };
  }
  for (const r of recipes.filter(r => r.category === 'food')) {
    for (const item of [...r.ingredients, ...r.outputs]) {
      if (images[item.key]) continue;
      if (item.key.startsWith('entity:')) {
        const s = sprite(item.id);
        const layers = (s.layers || [s]).map(l => layerImage(l, s)).filter(Boolean);
        // Stack visuals (e.g. pancakes) start hidden and are enabled by the game.
        if (!layers.length && s.state) {
          const initial = layerImage({ state: s.state }, s);
          if (initial) layers.push(initial);
        }
        if (layers.length) images[item.key] = { layers };
      } else {
        const reagent = reagents.get(item.id);
        const visual = reagent?.metamorphicSprite;
        const layer = visual ? layerImage(visual, visual) : null;
        images[item.key] = layer ? { layers: [layer] } : { color: reagent?.color || '#b9d6cf', reagent: true };
      }
    }
  }
  fs.writeFileSync(path.join(output, creditsFile), JSON.stringify([...credits.values()], null, 2) + '\n');
  return images;
};
