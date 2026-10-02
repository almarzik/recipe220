const fs=require('node:fs'),path=require('node:path'),YAML=require('yaml');
const root=require('../project-paths.cjs').gameRoot,read=p=>fs.readFileSync(path.join(root,p),'utf8').replace(/^\uFEFF/,'');
// Reaction effect tags are removed only for YAML parsing; the effect ID is retained separately.
const reactionSource='Resources/Prototypes/Atmospherics/reactions.yml';
const reactions=YAML.parse(read(reactionSource).replace(/!type:(\w+)\s*\{\}/g,'{ type: $1 }')).filter(r=>r.type==='gasReaction');
const locale=Object.fromEntries([...read('Resources/Locale/ru-RU/gases/gases.ftl').matchAll(/^([\w-]+)\s*=\s*(.+)$/gm)].map(m=>[m[1],m[2].trim()]));
const gases=YAML.parse(read('Resources/Prototypes/Atmospherics/gases.yml')).filter(g=>g.type==='gas').map(g=>({...g,name:locale[g.name]||g.id,source:'Resources/Prototypes/Atmospherics/gases.yml'}));
const rawConstants=Object.fromEntries([...read('Content.Shared/Atmos/Atmospherics.cs').matchAll(/public const float (\w+) = ([^;]+);/g)].map(m=>[m[1],m[2]]));
function constant(id,seen=[]){if(seen.includes(id)||!rawConstants[id])throw Error('Unknown constant '+id);let expr=rawConstants[id].replace(/(\d)f\b/g,'$1');expr=expr.replace(/\b[A-Za-z_]\w*\b/g,key=>String(constant(key,[...seen,id])));if(!/^[\d.eE+*/()\s-]+$/.test(expr))throw Error('Unsupported expression '+id);return Function('return ('+expr+')')();}
const keys=['R','T0C','SuperSaturationThreshold','SuperSaturationEnds','PlasmaMinimumBurnTemperature','PlasmaUpperTemperature','OxygenBurnRateBase','PlasmaOxygenFullburn','PlasmaBurnRateDelta','FirePlasmaEnergyReleased','MinimumTritiumOxyburnEnergy','TritiumBurnOxyFactor','TritiumBurnTritFactor','TritiumBurnFuelRatio','FireHydrogenEnergyReleased','FrezonProductionMaxEfficiencyTemperature','FrezonProductionNitrogenRatio','FrezonProductionTritRatio','FrezonProductionConversionRate','FrezonCoolLowerTemperature','FrezonCoolMidTemperature','FrezonNitrogenCoolRatio','FrezonCoolEnergyReleased','N2ODecompositionRate','AmmoniaOxygenReactionRate'];
const constants=Object.fromEntries(keys.map(k=>[k,constant(k)]));
for(const r of reactions)r.source=reactionSource;
const images=require('./build-atmos-thumbnails.cjs')(root,gases);
const data={gases,reactions,constants,images,generated:new Date().toISOString().slice(0,10)};
fs.writeFileSync(path.join(require('../project-paths.cjs').projectRoot, 'data/engineering-data.js'),'window.ENGINEERING_DATA = '+JSON.stringify(data,null,2)+';\n');
console.log(`Atmos: ${gases.length} gases, ${reactions.length} active reactions`);
