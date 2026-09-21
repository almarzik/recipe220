const fs=require('node:fs'),path=require('node:path'),YAML=require('yaml');
module.exports=function(root,gases){
  const sources=['Entities/Structures/Piping/Atmospherics/unary.yml','Entities/Structures/Piping/Atmospherics/binary.yml','Entities/Structures/Piping/Atmospherics/trinary.yml','Entities/Structures/Storage/Canisters/gas_canisters.yml','Entities/Objects/Specific/atmos.yml','Entities/Structures/Power/Generation/Singularity/emitter.yml','SS220/Entities/Structures/Power/Generation/Supermatter/crystal.yml','SS220/Entities/Structures/Power/Generation/Supermatter/smemitter.yml'];
  const entities=new Map();
  for(const source of sources){const text=fs.readFileSync(path.join(root,'Resources/Prototypes',source),'utf8').replace(/^\uFEFF/,'').replace(/!type:[\w]+/g,'');for(const p of YAML.parse(text))if(p.type==='entity')entities.set(p.id,p);}
  const mapping=Object.fromEntries(gases.map(g=>[g.id,g.id+'Canister']));
  Object.assign(mapping,{PlasmaFire:'PlasmaCanister',TritiumFire:'TritiumCanister',FrezonProduction:'FrezonCanister',FrezonCoolant:'GasThermoMachineFreezer',AmmoniaOxygenReaction:'AmmoniaCanister',N2ODecomposition:'NitrousOxideCanister',sm:'SuperMatterCrystal',emitter:'SMEmitter',economy:'FrezonCanister',calculator:'GasMixer'});
  const equipment=['GasAnalyzer','GasMixer','GasFilter','GasPressurePump','GasValve','GasThermoMachineHeater','GasVentScrubber','StorageCanister','GasRecycler','BaseGasCondenser'];
  equipment.forEach((id,i)=>mapping['equipment-'+i]=id);
  ['GasValve','TritiumCanister','GasVentPump','GasVentScrubber','GasAnalyzer','GasMixer'].forEach((id,i)=>mapping['practice-'+i]=id);
  const ids=[...new Set(Object.values(mapping))];
  const all=require('./build-thumbnails.cjs')({root,entities,reagents:new Map(),creditsFile:'engineering-credits.json',recipes:[{category:'food',ingredients:ids.map(id=>({key:'entity:'+id,id})),outputs:[]}]});
  return Object.fromEntries(Object.entries(mapping).map(([key,id])=>{const image=all['entity:'+id];if(!image?.layers?.length)throw Error('Missing atmosphere sprite: '+id);return [key,{...image,prototype:id}];}));
};
