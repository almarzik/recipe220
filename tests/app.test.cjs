const {projectRoot,gameRoot}=require('../scripts/project-paths.cjs');
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {JSDOM} = require('jsdom');
const text = name => fs.readFileSync(path.join(projectRoot,name),'utf8');
const context = {window:{}};vm.runInNewContext(text('data/recipes.js'),context);
const data = context.window.RECIPE_DATA;
const byId = new Map(data.recipes.map(r=>[r.id,r]));
test('all engineering views use pressure units and economics converts reference conditions',()=>{
  const a=app();try{
    for(const file of ['data/engineering-data.js','src/features/engineering/engineering.js','src/features/engineering/atmos-economy.js','src/features/engineering/supermatter.js','src/features/engineering/sm-observer.js'])a.w.eval(text(file));
    for(const mode of ['reactions','gases','equipment','practice','calculator','economy','sm']){a.click(`[data-atmos-mode="${mode}"]`);assert.doesNotMatch(a.doc.querySelector('#engineering').textContent,/мол(?:ь|ей|ях|и\b|яр)/i);}
    assert.equal(a.doc.querySelector('#sm-entry [name="moles"]'),null);
    const f=a.doc.querySelector('#atmos-economy-form'),m=a.doc.querySelector('#atmos-mix-form');m.elements.preset.value='air';m.dispatchEvent(new a.w.Event('input'));
    const oldPrice=Number(f.elements.namedItem('sell-Frezon').value);f.elements.basisV.value='2000';f.elements.basisV.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(Number(f.elements.namedItem('sell-Frezon').value),2*oldPrice);
    a.click('#economy-from-mix');assert.ok(Math.abs(Number(f.elements.namedItem('in-Oxygen').value)-105)<1e-8);
    f.elements.namedItem('sell-Frezon').value='7';f.elements.namedItem('sell-Frezon').dispatchEvent(new a.w.Event('input',{bubbles:true}));f.elements.basisT.value='600';f.elements.basisT.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(Number(f.elements.namedItem('sell-Frezon').value),7);
    a.click('#economy-fill-plan');assert.match(a.doc.querySelector('#economy-result').textContent,/выход/);assert.doesNotMatch(a.doc.querySelector('#engineering').textContent,/мол(?:ь|ей|ях|и\b|яр)/i);
  }finally{a.close();}
});
test('pressure mixture conserves partial pressures and converts temperature and volume for pricing',()=>{
  const {pressureMixture}=require('../src/features/engineering/engineering.js');const a=pressureMixture('air',1000,293.15,1000),b=pressureMixture('air',1000,20,2000,'C');
  assert.equal(a.rows[0].pressure,210);assert.equal(a.rows[1].pressure,790);assert.equal(a.rows.at(-1).until,1000);assert.equal(b.moles,a.moles*2);
  assert.equal(pressureMixture('air',1000,-273.15,1000,'C'),null);assert.equal(pressureMixture('air',1000,0,1000),null);assert.equal(pressureMixture('air',1000,20,0,'C'),null);
  const appState=app();try{const w=appState.w;for(const file of ['data/engineering-data.js','src/features/engineering/engineering.js','src/features/engineering/atmos-economy.js'])w.eval(text(file));const f=appState.doc.querySelector('#atmos-mix-form');f.elements.preset.value='air';f.dispatchEvent(new w.Event('input'));assert.match(appState.doc.querySelector('#atmos-mix-output').textContent,/кПа/);assert.doesNotMatch(appState.doc.querySelector('#atmos-mix-output').textContent,/моль/);
    f.elements.unit.value='C';f.elements.unit.dispatchEvent(new w.Event('input',{bubbles:true}));assert.equal(Number(f.elements.temperature.value),20);
    appState.click('#economy-from-mix');const cost=appState.doc.querySelector('#atmos-economy-form');assert.ok(Math.abs(Number(cost.elements.namedItem('in-Oxygen').value)-a.rows[0].pressure)<1e-8);
    f.elements.temperature.value='';f.dispatchEvent(new w.Event('input'));assert.match(appState.doc.querySelector('#atmos-mix-output').textContent,/Введите/);
  }finally{appState.close();}
});
test('SM observer matches game layout, accepts snapshots and never invents missing telemetry',()=>{
  const a=app();try{
    for(const file of ['data/engineering-data.js','src/features/engineering/engineering.js','src/features/engineering/atmos-economy.js','src/features/engineering/supermatter.js','src/features/engineering/sm-observer.js'])a.w.eval(text(file));
    a.click('#tab-engineering');a.click('[data-atmos-mode="sm"]');
    assert.ok(a.doc.querySelector('.sm-console-grid'));assert.equal(a.doc.querySelector('#sm-read-integrity').textContent,'—');assert.match(a.doc.querySelector('#sm-history-chart').textContent,/Нет замеров/);assert.ok(a.doc.querySelector('#sm-state-chart svg'));
    const entry=a.doc.querySelector('#sm-entry'),form=a.doc.querySelector('#sm-form');
    entry.elements.matter.value='100000';entry.elements.energy.value='44017';entry.elements.integrity.value='99';entry.elements.pressure.value='101.325';entry.elements.namedItem('gas-Oxygen').value='20';entry.elements.namedItem('gas-Nitrogen').value='80';entry.requestSubmit();
    assert.match(a.doc.querySelector('#sm-read-integrity').textContent,/99/);assert.ok(a.doc.querySelector('#sm-history-chart circle'));assert.match(form.elements.samples.value,/0;100000;44017/);assert.equal(entry.elements.integrity.value,'');
    entry.elements.matter.value='99950';entry.elements.energy.value='44000';entry.requestSubmit();assert.equal(a.doc.querySelector('#sm-read-integrity').textContent,'—');assert.equal(a.doc.querySelector('#sm-read-pressure').textContent,'—');
    a.click('[data-sm-plot="matter"]');assert.equal(a.doc.querySelectorAll('#sm-history-chart circle').length,2);
    form.requestSubmit();assert.ok(a.doc.querySelector('.sm-recommendation'));
    a.click('[data-sm-power="100"]');assert.equal(form.elements.power.value,'700');assert.equal(a.doc.querySelector('#sm-result').textContent,'');
    const slider=a.doc.querySelector('#sm-emitter-slider');slider.value='75';slider.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(form.elements.ratio.value,'75');assert.match(a.doc.querySelector('#sm-emitter-preview').textContent,/75%/);
    a.click('#sm-new-window');assert.equal(form.elements.samples.value,'');assert.equal(a.doc.querySelector('#sm-read-matter').textContent,'—');assert.equal(entry.elements.time.value,'0');
  }finally{a.close();}
});
test('SM observer rejects duplicate time and excessive gas percentages without corrupting history',()=>{
  const a=app();try{
    for(const file of ['data/engineering-data.js','src/features/engineering/engineering.js','src/features/engineering/supermatter.js','src/features/engineering/sm-observer.js'])a.w.eval(text(file));
    const entry=a.doc.querySelector('#sm-entry'),form=a.doc.querySelector('#sm-form');entry.elements.matter.value='100000';entry.elements.energy.value='44017';entry.elements.namedItem('gas-Oxygen').value='80';entry.elements.namedItem('gas-Nitrogen').value='80';entry.requestSubmit();assert.equal(form.elements.samples.value,'');assert.match(a.doc.querySelector('#sm-entry-status').textContent,/100%/);
    entry.elements.namedItem('gas-Nitrogen').value='20';entry.requestSubmit();entry.elements.time.value='0';entry.requestSubmit();assert.equal(form.elements.samples.value.split('\n').length,1);assert.match(a.doc.querySelector('#sm-entry-status').textContent,/позже/);
    form.elements.samples.value='broken';form.elements.samples.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(a.doc.querySelector('#sm-read-matter').textContent,'—');assert.match(a.doc.querySelector('#sm-observer-status').textContent,/ошибку/);
  }finally{a.close();}
});
test('gas valuation applies dominant-gas purity and time estimates use net collection',()=>{
  const {value,duration}=require('../src/features/engineering/atmos-economy.js');
  assert.equal(value([{amount:100,price:2.5},{amount:100,price:0}],true).value,125);
  assert.equal(value([{amount:100,price:2.5},{amount:100,price:0}],false).value,250);
  assert.equal(value([{amount:0,price:2.5}],true).value,0);
  assert.equal(value([{amount:-1,price:2.5}]),null);
  assert.deepEqual(duration(0,20,60,200),{rate:1/3,seconds:540});
  assert.equal(duration(20,20,60,200).seconds,null);assert.equal(duration(30,20,60,200).seconds,null);
  assert.equal(duration(200,200,60,200).seconds,0);assert.equal(duration(0,20,0,200),null);
  const {batch}=require('../src/features/engineering/atmos-economy.js'),frezon=batch('frezon',510);
  assert.equal(frezon.output.Frezon,510);assert.equal(frezon.input.Tritium,10);assert.equal(frezon.input.Oxygen,500);
  assert.equal(frezon.input.Nitrogen,frezon.output.Nitrogen);assert.equal(batch('ammonia',100).output.WaterVapor,300);
  assert.equal(batch('frezon',-1),null);
});
test('SM shot contribution and stable energy centers match this local implementation',()=>{
  const s=require('../src/features/engineering/supermatter.js');assert.deepEqual(s.shot(600,50),{matter:20,energy:80});
  assert.equal(s.shot(600,100).matter,0);assert.equal(s.shot(600,0).energy,0);
  assert.ok(Math.abs(s.safeEnergy(100000,1)-44017.0861712557)<1e-7);
  assert.ok(Math.abs(s.safeEnergy(100000,2)-177465.71249998332)<1e-7);
  assert.ok(Math.abs(s.safeEnergy(100000,3)-355758.4029663535)<1e-7);
  const source=fs.readFileSync(path.join(gameRoot,'Content.Shared/SS220/SuperMatter/Emitter/SharedSuperMatterEmitterExtensionConsts.cs'),'utf8');
  assert.match(source,/BaseMatter = 20f/);assert.match(source,/BaseEnergy = 80f/);assert.match(source,/BaseMatterPowerDivider = 300f/);
  const funcs=fs.readFileSync(path.join(gameRoot,'Content.Shared/SS220/SuperMatter/Functions/SuperMatterFunctions.cs'),'utf8');
  assert.match(funcs,/MatterNondimensionalization = 32f/);assert.match(funcs,/SafeInternalEnergyToMatterCoeff = 800f/);assert.match(funcs,/SafeModes = \[1f, 4f, 8f\]/);
});
test('SM estimation uses windowed absolute samples, preserves balance and flags drift and limits',()=>{
  const s=require('../src/features/engineering/supermatter.js'),e=s.safeEnergy(100000),opts={target:100000,horizon:300,window:60,gain:.5,count:2,power:1200,ratio:50,mode:1,hits:null};
  const rows=[0,30,60].map(time=>({time,matter:100000,energy:e})),r=s.tune(rows,opts);
  assert.equal(r.recommendation.power,1200);assert.equal(r.recommendation.ratio,50);assert.equal(r.predicted.matter,0);
  const falling=rows.map((r,i)=>({...r,matter:100120-i*60,energy:e+240-i*120})),fix=s.tune(falling,opts);
  assert.equal(fix.rates.matter,-2);assert.equal(fix.rates.energy,-4);assert.ok(fix.predicted.matter>-2);assert.ok(fix.predicted.energy>-4);
  assert.equal(s.tune(rows,{...opts,hits:0}).recommendation,null);
  assert.throws(()=>s.tune(rows,{...opts,window:1}),/двух/);assert.throws(()=>s.tune(rows,{...opts,power:599}),/600/);
  const capped=s.tune(rows,{...opts,target:10000000});assert.equal(capped.recommendation.power,16384);assert.ok(capped.notes.some(n=>n.includes('максимальных')));
  const drifting=[0,20,40,60].map((time,i)=>({time,matter:100000+[0,1,10,100][i],energy:e}));assert.ok(s.tune(drifting,opts).notes.some(n=>n.includes('дрейфует')));
});
test('SM sample parser rejects stale timestamps, invalid rows and ambiguous empty values',()=>{
  const {parseSamples}=require('../src/features/engineering/supermatter.js');
  assert.equal(parseSamples('0; 100 000; 44000,5\n60;99900;43990')[0].energy,44000.5);
  for(const source of ['0;1;2','0;1;2\n0;1;2','0;1;2\n60;;3','0;1;2\n60;Infinity;2','0;1;2\n60;0;2'])assert.throws(()=>parseSamples(source));
});
test('atmos economy and SM tabs calculate, preserve entries on tab switch and clear stale advice',()=>{
  const a=app();try{
    for(const file of ['data/engineering-data.js','src/features/engineering/engineering.js','src/features/engineering/atmos-economy.js','src/features/engineering/supermatter.js'])a.w.eval(text(file));
    a.click('#tab-engineering');a.click('[data-atmos-mode="economy"]');
    assert.equal(a.doc.querySelector('#atmos-economy').hidden,false);assert.equal(a.doc.querySelector('#atmos-results').hidden,true);
    const f=a.doc.querySelector('#atmos-economy-form');f.elements.namedItem('out-Frezon').value='200';f.dispatchEvent(new a.w.Event('input'));assert.ok(Math.abs(Number(f.elements.namedItem('sell-Frezon').value)-2.5*1000/(8.314462618*293.15))<1e-10);
    a.click('#economy-fill-plan');assert.equal(f.elements.namedItem('out-Frezon').value,'200');assert.ok(Number(f.elements.namedItem('in-Tritium').value)>0);
    a.click('#economy-from-mix');assert.ok(Number(f.elements.namedItem('in-Oxygen').value)>0);
    a.click('#time-from-output');assert.equal(a.doc.querySelector('#atmos-time-form').elements.target.value,'200');
    a.click('[data-atmos-mode="sm"]');assert.equal(a.doc.querySelector('#atmos-economy').hidden,true);assert.equal(a.doc.querySelector('#atmos-sm').hidden,false);
    const sm=a.doc.querySelector('#sm-form');sm.elements.samples.value='0;100000;44017\n30;99950;43997\n60;99900;43977';assert.equal(sm.checkValidity(),true);sm.requestSubmit();
    assert.ok(a.doc.querySelector('.sm-recommendation'));assert.equal(a.doc.querySelectorAll('.sm-plot svg').length,2);
    sm.elements.power.value='700';sm.dispatchEvent(new a.w.Event('input'));assert.equal(a.doc.querySelector('#sm-result').textContent,'');assert.match(a.doc.querySelector('#sm-stale').textContent,/заново/);
    a.click('[data-atmos-mode="gases"]');a.click('[data-atmos-mode="sm"]');assert.equal(sm.elements.power.value,'700');
    a.click('#sm-new-window');assert.equal(sm.elements.samples.value,'');
    a.click('#tab-recipes');assert.equal(a.doc.querySelector('.workspace').hidden,false);
  }finally{a.close();}
});
test('atmos data covers active reactions and gas catalog, with local thresholds',()=>{
  const ctx={window:{}};vm.runInNewContext(text('data/engineering-data.js'),ctx);const d=ctx.window.ENGINEERING_DATA;
  const YAML=require('yaml'),source=fs.readFileSync(path.join(gameRoot,'Resources/Prototypes/Atmospherics/reactions.yml'),'utf8').replace(/^\uFEFF/,'').replace(/!type:(\w+)\s*\{\}/g,'{ type: $1 }');
  assert.deepEqual(Array.from(d.reactions,r=>r.id),YAML.parse(source).map(r=>r.id));
  assert.equal(d.gases.length,9);assert.equal(d.reactions.length,6);
  assert.equal(d.constants.SuperSaturationThreshold,96);assert.equal(d.constants.SuperSaturationEnds,32);
  assert.equal(d.constants.FrezonProductionTritRatio,50);assert.equal(d.constants.FrezonProductionMaxEfficiencyTemperature,73.15);
  assert.equal(d.reactions.find(r=>r.id==='N2ODecomposition').minimumTemperature,850);
});
test('atmos thumbnails cover gases, reactions, equipment and SM with real RSI assets',()=>{
  const ctx={window:{}};vm.runInNewContext(text('data/engineering-data.js'),ctx);const d=ctx.window.ENGINEERING_DATA;
  const keys=[...d.gases.map(g=>g.id),...d.reactions.map(r=>r.id),...Array.from({length:10},(_,i)=>'equipment-'+i),...Array.from({length:6},(_,i)=>'practice-'+i),'sm','emitter'];
  for(const key of keys){const visual=d.images[key];assert.ok(visual?.layers.length,key);for(const l of visual.layers){assert.match(l.src,/^assets\/[a-f0-9]{20}\.png$/);const bytes=fs.readFileSync(path.join(projectRoot,l.src));assert.equal(bytes.readUInt32BE(16),l.sheetWidth);assert.equal(bytes.readUInt32BE(20),l.sheetHeight);assert.ok(l.width>0&&l.height>0&&l.width<=l.sheetWidth&&l.height<=l.sheetHeight);}}
  assert.equal(d.images.sm.prototype,'SuperMatterCrystal');assert.equal(d.images.emitter.prototype,'SMEmitter');
  assert.ok(JSON.parse(text('assets/engineering-credits.json')).every(c=>c.source&&c.license&&c.copyright));
  const a=app();try{for(const file of ['data/engineering-data.js','src/features/engineering/engineering.js','src/features/engineering/atmos-economy.js','src/features/engineering/supermatter.js'])a.w.eval(text(file));a.click('#tab-engineering');assert.equal(a.doc.querySelectorAll('[data-atmos-id] .atmos-thumbnail').length,6);a.click('[data-atmos-mode="gases"]');assert.equal(a.doc.querySelectorAll('[data-atmos-id] .atmos-thumbnail').length,9);assert.equal(a.doc.querySelectorAll('#atmos-economy tbody .atmos-thumbnail').length,9);assert.equal(a.doc.querySelectorAll('#atmos-sm .atmos-thumbnail').length,2);}finally{a.close();}
});
test('atmos calculators preserve moles and distinguish gas volume from reagent units',()=>{
  const {mixture,pressure}=require('../src/features/engineering/engineering.js');
  const trit=mixture('tritium',970);assert.equal(trit.find(r=>r.gas==='Oxygen').moles,960);assert.equal(trit.find(r=>r.gas==='Plasma').moles,10);
  const frezon=mixture('frezon',560);assert.ok(Math.abs(frezon.reduce((s,r)=>s+r.moles,0)-560)<1e-9);assert.equal(frezon.find(r=>r.gas==='Tritium').moles,10);
  assert.ok(Math.abs(pressure(100,293.15,1000)-243.73847164667)<1e-6);
  assert.equal(mixture('frezon',0),null);assert.equal(mixture('unknown',1),null);assert.equal(pressure(1,300,0),null);
});
test('engineering navigation, search and calculator work without losing saved cards',()=>{
  const a=app();try{
    a.w.eval(text('data/engineering-data.js'));a.w.eval(text('src/features/engineering/engineering.js'));a.click('#tab-engineering');
    assert.equal(a.doc.querySelector('#engineering').hidden,false);assert.equal(a.doc.querySelector('.workspace').hidden,true);
    assert.equal(a.doc.querySelectorAll('[data-atmos-id]').length,6);
    const search=a.doc.querySelector('#atmos-search');search.value='фрезон';search.dispatchEvent(new a.w.Event('input'));
    assert.ok(a.doc.querySelector('[data-atmos-id="FrezonProduction"]'));
    a.click('[data-atmos-preset="frezon"]');assert.equal(a.doc.querySelector('#atmos-calculator').hidden,false);
    const form=a.doc.querySelector('#atmos-mix-form');assert.equal(form.elements.preset.value,'frezon');form.elements.total.value='560';form.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(a.doc.querySelectorAll('#atmos-mix-output tbody tr').length,3);
    a.click('[data-atmos-mode="gases"]');search.value='';search.dispatchEvent(new a.w.Event('input'));assert.equal(a.doc.querySelectorAll('[data-atmos-id]').length,9);
    a.click('#tab-recipes');assert.equal(a.doc.querySelector('#engineering').hidden,true);assert.equal(a.doc.querySelector('.workspace').hidden,false);
  }finally{a.close();}
});
test('anomaly data includes all spatial variants, inherited rock effects and all behaviors',()=>{
  const ctx={window:{}};vm.runInNewContext(text('data/anomalies-data.js'),ctx);const d=ctx.window.ANOMALY_DATA;
  assert.equal(d.anomalies.length,18);assert.equal(d.behaviors.length,21);
  assert.ok(d.anomalies.every(a=>a.name&&a.effect&&a.critical&&a.advice&&a.core));
  assert.ok(d.anomalies.find(a=>a.id==='AnomalyRockUranium').components.some(c=>c.type==='TileSpawnAnomaly'));
  assert.match(d.behaviors.find(a=>a.id==='InconstancyParticle').details.join(' '),/80%/);
  assert.match(d.behaviors.find(a=>a.id==='FullSafe').details[0],/очки ×0.05/);
  const YAML=require('yaml'),source=YAML.parse(fs.readFileSync(path.join(gameRoot,'Resources/Prototypes/Anomaly/behaviours.yml'),'utf8'));
  assert.deepEqual(Array.from(d.behaviors,b=>b.id),source.filter(p=>p.type==='anomalyBehavior').map(p=>p.id));
});
test('anomaly advice respects random particle roles, hidden readings and supercritical state',()=>{
  const {advise}=require('../src/features/scientist/anomalies.js').AnomalyDesk;
  assert.match(advise('growing',{containment:'Delta'}),/Дельта/);
  assert.match(advise('growing',{containment:'Sigma'}),/Сигма/);
  assert.match(advise('growing',{}),/универсального безопасного выбора нет/);
  assert.match(advise('growing',{containment:'Delta',danger:'Delta'}),/две роли/);
  assert.match(advise('decaying',{unstable:'Zeta'}),/Дзета/);
  assert.match(advise('stable',{}),/не стреляйте без цели/);
  assert.match(advise('growing',{containment:'Delta'},100),/Сверхкритическое/);
  assert.match(advise('growing',{},-1),/от 0 до 100/);
});
test('anomalies is a nested scientist tab, preserves artifact input, and supports search and scanner helper',()=>{
  const a=scientistApp();try{
    a.w.eval(text('data/anomalies-data.js'));a.w.eval(text('src/features/scientist/anomalies.js'));
    const artifactSearch=a.doc.querySelector('#science-search');artifactSearch.value='кровь';artifactSearch.dispatchEvent(new a.w.Event('input'));
    a.click('[data-science-topic="anomalies"]');assert.equal(a.doc.querySelector('#science-artifacts').hidden,true);assert.equal(a.doc.querySelector('#science-anomalies').hidden,false);assert.equal(a.doc.querySelector('.workspace').hidden,true);
    assert.equal(a.doc.querySelectorAll('[data-anomaly-id]').length,18);
    a.click('[data-anomaly-mode="behaviors"]');assert.equal(a.doc.querySelectorAll('[data-anomaly-id]').length,21);
    const search=a.doc.querySelector('#anomaly-search');search.value='непостоянство';search.dispatchEvent(new a.w.Event('input'));assert.equal(a.doc.querySelectorAll('[data-anomaly-id]').length,3);
    const form=a.doc.querySelector('#anomaly-helper');form.elements.state.value='growing';form.elements.containment.value='Epsilon';form.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.match(a.doc.querySelector('#anomaly-advice').textContent,/Эпсилон/);
    a.click('[data-science-topic="artifacts"]');assert.equal(artifactSearch.value,'кровь');assert.equal(a.doc.querySelector('#science-artifacts').hidden,false);
  }finally{a.close();}
});
function scientistApp(preferences={}){const a=app(undefined,preferences);a.w.eval(text('data/scientist-data.js'));a.w.eval(text('src/features/scientist/scientist.js'));a.click('#tab-scientist');return a;}
test('scientist data covers every trigger and effect prototype and separates inactive variants',()=>{
  const ctx={window:{}};vm.runInNewContext(text('data/scientist-data.js'),ctx);const d=ctx.window.SCIENTIST_DATA,YAML=require('yaml');
  for(const [key,file,type] of [['triggers','triggers.yml','xenoArchTrigger'],['effects','effects.yml','entity']]){
    const source=YAML.parse(fs.readFileSync(path.join(gameRoot,'Resources/Prototypes/XenoArch',file),'utf8').replace(/!type:[\w]+/g,''));
    const entries=source.filter(v=>v.type===type&&!v.abstract);
    assert.deepEqual(Array.from(d[key],v=>v.id),entries.map(v=>v.id));
    assert.ok(d[key].every(v=>v.name&&v.steps.length&&v.status&&v.source));
    for(const item of d[key])assert.deepEqual(JSON.parse(JSON.stringify(item.raw)),entries.find(e=>e.id===item.id));
  }
  assert.equal(d.triggers.length,26);assert.equal(d.effects.length,68);
  assert.equal(d.triggers.find(v=>v.id==='TriggerInteraction').active,false);
  assert.equal(d.effects.find(v=>v.id==='XenoArtifactTesla').active,false);
  assert.equal(d.effects.find(v=>v.id==='XenoArtifactOmnitool').status,'Только ручные артефакты');
  assert.match(d.triggers.find(v=>v.id==='TriggerWater').steps.join(' '),/5 ед/);
  assert.match(d.triggers.find(v=>v.id==='TriggerMagnet').steps.join(' '),/ботинки/);
  assert.match(d.effects.find(v=>v.id==='XenoArtifactPolyMonkey').steps.join(' '),/MobMonkey.*20 секунд/);
});
test('scientist searches exact hints, filters effects and expands instructions',()=>{
  const a=scientistApp();try{
    assert.equal(a.doc.querySelectorAll('[data-science-id]').length,25);
    const search=a.doc.querySelector('#science-search');search.value='пульсирование';search.dispatchEvent(new a.w.Event('input'));
    assert.equal(a.doc.querySelectorAll('[data-science-id]').length,1);
    const entry=a.doc.querySelector('[data-science-id="TriggerPulsing"]');assert.match(entry.textContent,/Мультитул/);a.click('[data-science-id="TriggerPulsing"] > summary');assert.equal(entry.open,true);
    a.click('#science-reset');a.click('[data-science-mode="effects"]');assert.equal(a.doc.querySelectorAll('[data-science-id]').length,60);
    a.click('#science-inactive');assert.equal(a.doc.querySelectorAll('[data-science-id]').length,68);
    search.value='пена';search.dispatchEvent(new a.w.Event('input'));assert.ok(a.doc.querySelector('[data-science-id="XenoArtifactFoamDangerous"]'));
    assert.match(a.doc.querySelector('[data-science-id="XenoArtifactFoamDangerous"]').textContent,/Напалм|напалм/);
  }finally{a.close();}
});
test('scientist hides workspace, preserves collapse state and saves research notes safely',()=>{
  const a=scientistApp();let notes;try{
    assert.equal(a.doc.querySelector('.workspace').hidden,true);assert.equal(a.doc.querySelector('.workspace-heading').hidden,true);
    assert.equal(a.doc.querySelector('#workspace-jump').hidden,true);assert.equal(a.doc.querySelector('#security').hidden,true);
    a.click('#tab-recipes');a.click('#toggle-workspace');a.click('#tab-scientist');a.click('#tab-recipes');assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
    const input=a.doc.querySelector('#science-notes');input.value='Узел 123: <img src=x> вода';input.dispatchEvent(new a.w.Event('input'));notes=a.w.localStorage.getItem('ss14-scientist-notes');
  }finally{a.close();}
  const b=scientistApp({'ss14-scientist-notes':notes});try{assert.equal(b.doc.querySelector('#science-notes').value,notes);assert.equal(b.doc.querySelector('#scientist img'),null);}finally{b.close();}
});
function securityApp(){const a=app();a.w.eval(text('data/security-data.js'));a.w.eval(text('src/features/security/security.js'));a.click('#tab-security');return a;}
test('security cards select on click, explanations only respond to their own target, and report is removed',()=>{
  const a=securityApp();try{
    assert.equal(a.doc.querySelector('#security-form,.security-report,#security-output'),null);assert.equal(a.w.SecurityDesk.documentText,undefined);
    assert.deepEqual([...a.doc.querySelector('footer').children].map(el=>el.textContent),['Станция рецептов','ss220','От игрока - игрокам!']);
    const card=a.doc.querySelector('[data-charge="103"]');card.dispatchEvent(new a.w.Event('pointerover',{bubbles:true}));assert.equal(a.doc.querySelector('#law-tooltip').hidden,false);
    a.click('[data-charge="103"] .law-label');assert.equal(a.doc.querySelector('[data-charge="103"]').getAttribute('aria-pressed'),'true');assert.equal(a.doc.querySelector('#law-dialog').open,false);assert.match(a.doc.querySelector('.sentence-value').textContent,/5 мин \/ Пред/);
    const hint=a.doc.querySelector('[data-law="103"]');hint.dispatchEvent(new a.w.Event('pointerover',{bubbles:true}));assert.equal(a.doc.querySelector('#law-tooltip').hidden,false);assert.equal(a.doc.querySelector('#law-tooltip').textContent,'Учебный пример: '+a.w.SECURITY_DATA.laws.find(l=>l.code==='103').example);
    a.click('[data-law="103"]');assert.equal(a.doc.querySelector('#law-dialog').open,true);assert.equal(a.doc.querySelector('[data-charge="103"]').getAttribute('aria-pressed'),'true');a.click('#law-close');
    a.click('[data-charge="108"]');assert.doesNotMatch(a.doc.querySelector('.sentence-value').textContent,/Пред/);a.click('[data-charge="108"]');assert.match(a.doc.querySelector('.sentence-value').textContent,/Пред/);
    a.click('[data-charge="103"]');assert.equal(a.doc.querySelector('#sentence-result').dataset.kind,'empty');
  }finally{a.close();}
});
test('security modifier buttons share one group and disable effects without losing dropdown settings',()=>{
  const a=securityApp();try{
    const result=()=>a.doc.querySelector('#sentence-result');
    const change=(id,value)=>{const el=a.doc.querySelector(id);el.value=value;el.dispatchEvent(new a.w.Event('change',{bubbles:true}));};
    assert.equal(a.doc.querySelectorAll('#sentence-modifiers button[data-modifier]').length,10);
    assert.equal(a.doc.querySelectorAll('#security-selected [data-sentence-field="repeat"],#security-selected [data-sentence-field="exemption"],#security-selected input[type="checkbox"]').length,0);
    a.click('[data-charge="200"]');a.click('#sentence-accessory');assert.match(result().textContent,/8:00/);a.click('#sentence-accessory');assert.match(result().textContent,/10:00/);
    a.click('#sentence-conversion');assert.equal(result().dataset.kind,'conversion');change('#sentence-conversion-stage','restored');assert.equal(result().dataset.kind,'released');a.click('#sentence-conversion');assert.match(result().textContent,/10:00/);
    a.click('#sentence-threat');assert.equal(result().dataset.kind,'transfer');change('#sentence-threat-action','release');assert.equal(result().dataset.kind,'emergency');a.click('#sentence-threat');assert.match(result().textContent,/10:00/);
    a.click('#sentence-repeat');change('[data-code="200"][data-sentence-field="repeat"]','2');assert.match(result().textContent,/20:00/);a.click('#sentence-repeat');assert.match(result().textContent,/10:00/);a.click('#sentence-repeat');assert.match(result().textContent,/20:00/);a.click('#sentence-repeat');
    a.click('[data-charge="207"]');a.click('#sentence-necessity');change('#modifier-necessity-scope','200');assert.match(result().textContent,/10:00/);
    a.click('[data-remove-charge="200"]');assert.equal(a.doc.querySelector('#sentence-necessity').getAttribute('aria-pressed'),'false');assert.match(result().textContent,/10:00/);
  }finally{a.close();}
});
test('security special modifiers update immediately, copy safely and reset completely',()=>{
  const a=securityApp();try{
    const r=()=>a.doc.querySelector('#sentence-result');
    a.click('#sentence-accessory');const mode=a.doc.querySelector('#sentence-accessory-mode');mode.value='unaccused';mode.dispatchEvent(new a.w.Event('change',{bubbles:true}));assert.match(r().textContent,/Таймер камеры: 5:00/);
    a.click('#sentence-clear');a.click('[data-charge="200"]');assert.match(r().textContent,/10:00/);
    assert.equal(a.doc.querySelector('#sentence-modifiers input[type="checkbox"]'),null);assert.equal(a.doc.querySelector('#sentence-medical'),null);
    a.click('#sentence-directive');assert.equal(r().dataset.kind,'conflict');assert.equal(a.doc.querySelector('#modifier-panel-directive').hidden,false);
    const directive=a.doc.querySelector('#sentence-directive-text');directive.value='<b>Освободить</b>';directive.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(r().dataset.kind,'directive');assert.equal(r().querySelector('b'),null);
    a.click('#sentence-copy');assert.match(a.doc.querySelector('#sentence-copy-text').value,/<b>Освободить<\/b>/);
    a.click('#sentence-clear');assert.equal(r().dataset.kind,'empty');assert.equal(directive.value,'');assert.equal(a.doc.querySelector('#modifier-panel-directive').hidden,true);assert.equal(a.doc.querySelectorAll('[data-modifier][aria-pressed="true"]').length,0);
  }finally{a.close();}
});
test('security live sentence calculator updates fractions, copied text, exemptions, layout and reset',()=>{
  const a=securityApp();try{
    const result=()=>a.doc.querySelector('#sentence-result');
    const change=(selector,value)=>{const el=a.doc.querySelector(selector);el.value=value;el.dispatchEvent(new a.w.Event('change',{bubbles:true}));};
    a.click('[data-charge="200"]');assert.match(result().textContent,/Таймер камеры: 10:00/);
    a.click('#sentence-refusal');a.click('#sentence-surrender');assert.match(result().textContent,/Таймер камеры: 7:30/);
    a.click('#sentence-cooperation');assert.match(result().textContent,/Таймер камеры: 3:45/);
    a.click('#sentence-copy');assert.match(a.doc.querySelector('#sentence-copy-text').value,/Итог: 3,75 мин/);
    a.click('#sentence-repeat');change('[data-code="200"][data-sentence-field="repeat"]','2');assert.equal(a.doc.querySelector('#sentence-copy-text'),null);assert.equal(a.doc.querySelector('#sentence-order-label').hidden,false);
    change('[data-code="200"][data-sentence-field="repeat"]','5');assert.equal(result().dataset.kind,'permanent');assert.equal(result().querySelector('.sentence-clock'),null);
    a.click('#sentence-defense');assert.equal(result().dataset.kind,'released');
    a.click('#sentence-layout');assert.equal(a.doc.querySelector('.security-layout').classList.contains('security-stack'),true);
    a.click('#sentence-clear');assert.equal(result().dataset.kind,'empty');assert.equal(a.doc.querySelector('#sentence-copy').disabled,true);assert.equal(a.doc.querySelector('#sentence-surrender').getAttribute('aria-pressed'),'false');assert.equal(a.doc.querySelector('#sentence-refusal').getAttribute('aria-pressed'),'false');
    a.click('[data-charge="200"]');assert.match(result().textContent,/Таймер камеры: 10:00/);
  }finally{a.close();}
});
test('security calculator blocks damage double-counting and clears obsolete confirmation',()=>{
  const a=securityApp();try{
    a.click('[data-charge="100"]');a.click('[data-charge="208"]');assert.equal(a.doc.querySelector('#sentence-result').dataset.kind,'conflict');
    a.click('#sentence-damage');assert.match(a.doc.querySelector('#sentence-result').textContent,/Таймер камеры: 15:00/);
    a.click('[data-remove-charge="100"]');assert.equal(a.doc.querySelector('#sentence-damage').checked,false);
    a.click('[data-charge="100"]');assert.equal(a.doc.querySelector('#sentence-result').dataset.kind,'conflict');
  }finally{a.close();}
});
test('security source imports every current article with attribution, examples and no obsolete 107',()=>{
  const ctx={window:{}};vm.runInNewContext(text('data/security-data.js'),ctx);const security=ctx.window.SECURITY_DATA;
  const source=new JSDOM(text('sources/security-source.html')).window.document;
  const headings=[...source.querySelectorAll('h5')].map(h=>h.textContent.trim());
  assert.equal(security.laws.length,32);assert.equal(security.revision,14940);
  assert.deepEqual(Array.from(security.laws,l=>l.code+' — '+l.name),headings);
  assert.ok(security.laws.every(l=>l.example&&l.paragraphs.length&&l.penalty&&l.anchor));
  assert.equal(security.laws.find(l=>l.code==='207').name,'Мелкая кража');assert.equal(security.laws.some(l=>l.code==='107'),false);
  assert.match(security.license,/by-nc-sa\/4.0/);
});
test('security hides the entire workspace and restores cards and collapse preference when leaving',()=>{
  const a=app();try{
    a.search('DexalinPlus');a.click('[data-add="reaction:DexalinPlus"]');const saved=a.saved();
    a.w.eval(text('data/security-data.js'));a.w.eval(text('src/features/security/security.js'));a.click('#tab-security');
    for(const selector of ['.workspace','.workspace-heading','#workspace-jump'])assert.equal(a.doc.querySelector(selector).hidden,true);
    assert.equal(a.doc.querySelector('#security').hidden,false);assert.equal(a.doc.querySelector('#catalog').hidden,true);
    a.click('#tab-recipes');assert.equal(a.doc.querySelector('.workspace').hidden,false);assert.equal(a.saved(),saved);
    a.click('#toggle-workspace');a.click('#tab-security');a.click('#tab-botany');assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
  }finally{a.close();}
});
test('security matrix search, hover examples, dialog and article selection work together',()=>{
  const a=securityApp();try{
    assert.equal(a.doc.querySelectorAll('[data-law]').length,32);
    const law=a.doc.querySelector('[data-law="100"]');law.dispatchEvent(new a.w.Event('pointerover',{bubbles:true}));assert.equal(a.doc.querySelector('#law-tooltip').hidden,false);assert.match(a.doc.querySelector('#law-tooltip').textContent,/лампы/);
    a.click('[data-law="100"]');assert.equal(a.doc.querySelector('#law-dialog').open,true);assert.match(a.doc.querySelector('#law-dialog-content').textContent,/Граффити/);a.click('#law-select');
    assert.equal(a.doc.querySelector('[data-charge="100"]').getAttribute('aria-pressed'),'true');
    const search=a.doc.querySelector('#law-search');search.value='207';search.dispatchEvent(new a.w.Event('input'));assert.equal(a.doc.querySelectorAll('[data-law]').length,1);assert.ok(a.doc.querySelector('[data-law="207"]'));
    assert.ok(a.doc.querySelector('[data-remove-charge="100"]'));a.click('[data-remove-charge="100"]');assert.equal(a.doc.querySelectorAll('[data-remove-charge]').length,0);
  }finally{a.close();}
});
test('kitchen stocks match Chefvend and require selected flour, milk and animal products',()=>{
  const {ChefMenu}=require('../src/features/recipes/chef-menu.js'),YAML=require('yaml');
  const options=ChefMenu.stockOptions(data),vend=options.filter(o=>o.group==='ШефВенд');
  const inventory=YAML.parse(fs.readFileSync(path.join(gameRoot,'Resources/Prototypes/Catalog/VendingMachines/Inventories/chefvend.yml'),'utf8'))[0].startingInventory;
  assert.deepEqual(vend.map(o=>o.key.slice(6)).sort(),Object.keys(inventory).sort());
  const dish=keys=>({ingredients:keys.map(key=>({key})),outputs:[{key:'entity:TestDish'}]});
  assert.equal(ChefMenu.stockFilter(data,[])(byId.get('microwave:RecipeBun')),false);
  assert.equal(ChefMenu.stockFilter(data,['stock:ReagentContainerFlour'])(byId.get('microwave:RecipeBun')),true);
  assert.equal(ChefMenu.stockFilter(data,['animal:goat'])(dish(['reagent:MilkGoat','entity:FoodMeat'])),true);
  assert.equal(ChefMenu.stockFilter(data,['animal:goat'])(dish(['reagent:Milk'])),false);
  assert.equal(ChefMenu.stockFilter(data,['animal:pig'])(dish(['entity:FoodMeatBacon'])),true);
  assert.equal(ChefMenu.stockFilter(data,['animal:pig'])(dish(['entity:FoodMeatChicken'])),false);
  assert.equal(ChefMenu.stockFilter(data,['stock:DrinkMilkCarton'])(dish(['reagent:Milk'])),true);
  const menu=ChefMenu.pickMenu(data.recipes,10,[],()=>.5,ChefMenu.stockFilter(data,vend.map(o=>o.key)));
  assert.equal(menu.length,10);assert.ok(menu.every(r=>!r.ingredients.some(i=>/Organ|Robot/.test(i.key))));
});
test('Chefvend preset keeps selected plants, persists supplies and builds a menu',()=>{
  const a=app();try{
    a.click('[data-category="food"]');a.click('[data-produce="entity:FoodTomato"]');a.click('#stock-chefvend');
    assert.equal(a.doc.querySelector('[data-produce="entity:FoodTomato"]').checked,true);
    assert.equal(a.doc.querySelector('[data-produce="stock:ReagentContainerFlour"]').checked,true);
    assert.equal(a.doc.querySelector('[data-produce="animal:goat"]').checked,false);
    a.click('#chef-produce-menu');assert.equal(JSON.parse(a.saved()).length,10);
    assert.ok(JSON.parse(a.w.localStorage.getItem('ss14-chef-produce')).includes('stock:DrinkMilkCarton'));
    a.click('#produce-clear');assert.equal(a.doc.querySelectorAll('[data-produce]:checked').length,0);
  }finally{a.close();}
});
test('produce menu follows nested preparations and excludes unavailable vegetables',()=>{
  const {ChefMenu}=require('../src/features/recipes/chef-menu.js');
  const tomato=ChefMenu.produceFilter(data,['entity:FoodTomato']);
  assert.equal(tomato(byId.get('microwave:RecipeTomatoSoup')),true);
  assert.equal(tomato(byId.get('microwave:RecipeShawarma')),false);
  assert.equal(ChefMenu.produceFilter(data,['entity:FoodTomato','entity:FoodCabbage'])(byId.get('microwave:RecipeShawarma')),true);
  assert.equal(tomato(byId.get('microwave:RecipeBigBiteBurger')),false);
  assert.equal(ChefMenu.produceFilter(data,['entity:FoodTomato','entity:FoodOnion'])(byId.get('microwave:RecipeBigBiteBurger')),true);
  const dish={ingredients:[{key:'reagent:JuiceTomato'}],outputs:[{key:'entity:TestDish'}]};
  assert.equal(tomato(dish),true);assert.equal(ChefMenu.produceFilter(data,['entity:FoodApple'])(dish),false);
  assert.equal(tomato(byId.get('microwave:RecipeBun')),false);
  assert.equal(ChefMenu.pickMenu(data.recipes,10,[],()=>.5,ChefMenu.produceFilter(data,[])).length,0);
});
test('ordinary additions fill rows from left to right even while workspace is collapsed',()=>{
  const a=app();try{
    Object.defineProperty(a.doc.querySelector('#viewport'),'clientWidth',{value:960});
    a.click('#toggle-workspace');a.search('DexalinPlus');
    for(let i=0;i<4;i++)a.click('[data-add="reaction:DexalinPlus"]');
    const cards=JSON.parse(a.saved());
    assert.deepEqual(cards.slice(0,3).map(c=>c.y),[24,24,24]);
    assert.ok(cards[0].x<cards[1].x&&cards[1].x<cards[2].x);
    assert.equal(cards[3].x,24);assert.ok(cards[3].y>cards[0].y);
    assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
  }finally{a.close();}
});
test('collapsed workspace uses its real width: four cards in a row, then wraps the fifth',()=>{
  const a=app();try{
    Object.defineProperty(a.doc.querySelector('.workspace'),'clientWidth',{value:1300,configurable:true});
    a.click('#toggle-workspace');a.search('DexalinPlus');
    for(let i=0;i<5;i++)a.click('[data-add="reaction:DexalinPlus"]');
    const check=()=>{const cards=JSON.parse(a.saved());assert.deepEqual(cards.slice(0,4).map(c=>c.y),[24,24,24,24]);assert.deepEqual(cards.slice(0,4).map(c=>c.x),[24,322,620,918]);assert.equal(cards[4].x,24);assert.ok(cards[4].y>24);};
    check();a.click('#arrange');check();
    assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
    Object.defineProperty(a.doc.querySelector('.workspace'),'clientWidth',{value:650});
    a.click('#arrange');assert.ok(JSON.parse(a.saved())[2].y>24);
  }finally{a.close();}
});
test('produce picker builds a partial menu, saves selection and never expands the workspace',()=>{
  const a=app();let selection;try{
    a.click('[data-category="food"]');a.click('#toggle-workspace');
    assert.equal(a.doc.querySelector('#chef-produce-menu').disabled,true);
    a.click('[data-produce="entity:FoodTomato"]');a.click('#chef-produce-menu');
    const cards=JSON.parse(a.saved()),filter=a.w.ChefMenu.produceFilter(a.w.RECIPE_DATA,['entity:FoodTomato']);
    assert.ok(cards.length>0&&cards.length<10);assert.ok(cards.every(c=>filter(byId.get(c.recipeId))));
    assert.match(a.doc.querySelector('#chef-result').textContent,/Это все/);
    assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
    selection=a.w.localStorage.getItem('ss14-chef-produce');
    a.click('#produce-clear');assert.equal(a.doc.querySelector('#chef-produce-menu').disabled,true);
  }finally{a.close();}
  const b=app(undefined,{'ss14-chef-produce':selection});try{assert.equal(b.doc.querySelector('[data-produce="entity:FoodTomato"]').checked,true);}finally{b.close();}
});
function app(saved,preferences={}) {
  const dom = new JSDOM(text('index.html'),{url:'http://localhost:4173',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window;
  w.ResizeObserver=class{observe(){}};
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.HTMLElement.prototype.scrollTo=function(p){this.scrollLeft=p.left||0;this.scrollTop=p.top||0;};
  w.HTMLElement.prototype.animate=function(){};
  w.HTMLElement.prototype.setPointerCapture=function(){};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  if(saved)w.localStorage.setItem('ss14-recipe-workbench-v1',saved);
  for(const [key,value] of Object.entries(preferences))w.localStorage.setItem(key,value);
  w.eval(text('data/recipes.js'));w.eval(text('src/features/recipes/chemistry.js'));w.eval(text('data/player-guides.js'));w.eval(text('src/features/recipes/chef-menu.js'));w.eval(text('src/components/navigation.js'));w.eval(text('src/app.js'));w.eval(text('src/features/botany/botany.js'));w.eval(text('src/features/players/players.js'));
  return {w,doc:w.document,close:()=>{w.document.getElementById('board').replaceChildren();w.close();},click:selector=>{const el=w.document.querySelector(selector);assert.ok(el,selector);el.click();},search:q=>{const input=w.document.querySelector('#search');input.value=q;input.dispatchEvent(new w.Event('input',{bubbles:true}));},saved:()=>w.localStorage.getItem('ss14-recipe-workbench-v1')};
}
test('data has unique recipes, real sources, valid amounts and consistent dependency links',()=>{
  assert.ok(data.recipes.length>700);assert.equal(byId.size,data.recipes.length);
  for(const r of data.recipes){assert.ok(['chem','food','bar'].includes(r.category));assert.ok(fs.existsSync(path.join(gameRoot,r.source)),r.source);assert.ok(r.ingredients.length);for(const i of [...r.ingredients,...r.outputs])assert.ok(Number.isFinite(i.amount)&&i.amount>0,r.id+': '+i.id);}
  for(const [key,ids] of Object.entries(data.byOutput))for(const id of ids)assert.ok(byId.get(id)?.outputs.some(o=>o.key===key),id);
});
test('actual local recipe values: dough, slices, catalyst, temperature and shaker',()=>{
  assert.equal(byId.get('reaction:CreateDough').ingredients.find(i=>i.id==='Flour').amount,15);
  assert.equal(byId.get('slice:FoodDoughFlat').outputs[0].amount,3);
  assert.equal(byId.get('reaction:Curdling').ingredients.find(i=>i.id==='Enzyme').catalyst,true);
  assert.ok(byId.get('reaction:Glintwine').conditions.includes('от 335 K'));
  assert.ok(byId.get('reaction:French75').conditions.includes('Встряхнуть в шейкере'));
  assert.ok(data.byOutput['entity:FoodDoughSlice'].includes('slice:FoodDoughFlat'));
  assert.ok(data.byOutput['entity:FoodDoughFlat'].some(id=>id.startsWith('graph:Pizza:')));
  assert.ok(data.byOutput['entity:FoodDough'].includes('reaction:CreateDough'));
});
test('catalog searches Russian names, IDs and ingredients, categories and empty result reset',()=>{
  const a=app();try{
    a.search('RecipeBun');assert.ok(a.doc.querySelector('[data-add="microwave:RecipeBun"]'));assert.ok([...a.doc.querySelectorAll('[data-add]')].every(el=>el.dataset.add.includes('RecipeBun')));
    a.click('[data-category="bar"]');assert.equal(a.doc.querySelectorAll('.recipe-tile').length,0);
    a.search('френч');assert.ok(a.doc.querySelector('[data-add="reaction:French75"]'));
    a.search('несуществующийрецепт123');assert.equal(a.doc.querySelector('#no-results').hidden,false);
    a.click('#reset');assert.equal(a.doc.querySelectorAll('.recipe-tile').length,36);
    a.search('Flour');assert.ok(a.doc.querySelectorAll('.recipe-tile').length>0);
  }finally{a.close();}
});
test('ingredient expansion, adjacent placement, recursive scaling, checks and persistence',()=>{
  const a=app();let saved;try{
    a.search('RecipeBun');a.click('[data-add="microwave:RecipeBun"]');
    a.click('.todo [data-expand="0"]');
    if(a.doc.querySelector('#variants').open)a.click('[data-variant="slice:FoodDoughFlat"]');
    let cards=JSON.parse(a.saved());assert.equal(cards.length,2);assert.ok(cards[1].x>cards[0].x);assert.equal(cards[1].parent,cards[0].uid);
    const scale=a.doc.querySelector('.todo [data-output]');scale.value='7';scale.dispatchEvent(new a.w.Event('change',{bubbles:true}));
    cards=JSON.parse(a.saved());assert.equal(cards[0].scale,7);assert.equal(cards[1].scale,3);
    a.click('.todo [data-ingredient="0"]');a.click('.todo [data-done]');
    const header=a.doc.querySelector('.todo-header');header.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
    saved=a.saved();cards=JSON.parse(saved);assert.equal(cards[0].done,true);assert.deepEqual(cards[0].checked,[0]);assert.equal(cards[0].x,34);
  }finally{a.close();}
  const b=app(saved);try{assert.equal(b.doc.querySelectorAll('.todo').length,2);assert.equal(b.doc.querySelector('[data-done]').checked,true);b.click('#clear-done');assert.equal(b.doc.querySelectorAll('.todo').length,1);b.click('#clear');assert.equal(b.doc.querySelector('#clear-dialog').open,true);b.click('#cancel-clear');assert.equal(b.doc.querySelectorAll('.todo').length,1);b.click('#clear');b.click('#confirm-clear');assert.equal(b.doc.querySelectorAll('.todo').length,0);}finally{b.close();}
});
test('drag updates position and saves; catalyst does not scale',()=>{
  const a=app();try{
    a.search('Curdling');a.click('[data-add="reaction:Curdling"]');
    const header=a.doc.querySelector('.todo-header');
    header.dispatchEvent(new a.w.MouseEvent('pointerdown',{bubbles:true,button:0,clientX:50,clientY:50}));
    header.dispatchEvent(new a.w.MouseEvent('pointermove',{bubbles:true,clientX:180,clientY:150}));
    header.dispatchEvent(new a.w.MouseEvent('pointerup',{bubbles:true}));
    const cards=JSON.parse(a.saved());assert.ok(cards[0].x>24);assert.ok(cards[0].y>24);
    const scale=a.doc.querySelector('[data-output]');scale.value=4;scale.dispatchEvent(new a.w.Event('change',{bubbles:true}));
    const enzyme=[...a.doc.querySelectorAll('.ingredients li')].find(li=>li.querySelector('.catalyst'));assert.match(enzyme.querySelector('.quantity').textContent,/^5 /);
  }finally{a.close();}
});
test('corrupt saved data does not prevent catalog loading',()=>{const a=app('invalid json');try{assert.equal(a.doc.querySelectorAll('.recipe-tile').length,36);assert.equal(a.doc.querySelectorAll('.todo').length,0);}finally{a.close();}});

test('food thumbnails cover every item and use existing first-frame PNG assets',()=>{
  for(const r of data.recipes.filter(r=>r.category==='food'))for(const item of [...r.ingredients,...r.outputs]){
    const visual=data.images[item.key];assert.ok(visual,item.key);
    if(item.key.startsWith('entity:'))assert.ok(visual.layers.length,item.key);
    for(const layer of visual.layers||[]){assert.ok(fs.existsSync(path.join(projectRoot,layer.src)));assert.ok(layer.width>0&&layer.height>0&&layer.sheetWidth>=layer.width&&layer.sheetHeight>=layer.height);}
  }
  assert.ok(JSON.parse(text('assets/credits.json')).every(c=>c.license&&c.source));
});

test('food title previews from catalog and workspace never add cards; nested viewing returns',()=>{
  const a=app();try{
    a.search('RecipeBun');a.click('[data-preview="microwave:RecipeBun"]');
    assert.equal(a.doc.querySelector('#recipe-preview').open,true);assert.equal(a.doc.querySelectorAll('.todo').length,0);
    assert.ok(a.doc.querySelector('#preview-content .thumbnail'));
    assert.equal(a.doc.querySelectorAll('#preview-content [data-add],#preview-content input[type="checkbox"]').length,0);
    a.click('#preview-content [data-preview-ingredient]');
    if(a.doc.querySelector('[data-preview-choice]'))a.click('[data-preview-choice="slice:FoodDoughFlat"]');
    assert.match(a.doc.querySelector('#preview-title').textContent,/теста/);
    a.click('#preview-back');assert.equal(a.doc.querySelector('#preview-title').textContent,'булочка');
    a.click('#close-preview');a.click('[data-add="microwave:RecipeBun"]');const before=a.saved();
    a.click('.todo [data-preview]');assert.equal(a.saved(),before);assert.equal(a.doc.querySelectorAll('.todo').length,1);
  }finally{a.close();}
});

test('workspace collapse persists when adding without scrolling, including pending animation frames',async()=>{
  const a=app();try{
    a.search('RecipeBun');a.click('[data-add="microwave:RecipeBun"]');const before=a.saved();
    a.click('#toggle-workspace');assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
    assert.equal(a.doc.querySelector('#toggle-workspace').getAttribute('aria-expanded'),'false');assert.equal(a.saved(),before);
    assert.equal(a.w.localStorage.getItem('ss14-workspace-collapsed'),'true');
    let scrollCalls=0;
    a.w.HTMLElement.prototype.scrollIntoView=function(){scrollCalls++;};
    a.w.HTMLElement.prototype.scrollTo=function(){scrollCalls++;};
    a.click('[data-add="microwave:RecipeBun"]');
    await new Promise(resolve=>a.w.requestAnimationFrame(resolve));
    assert.equal(scrollCalls,0);
    assert.equal(a.doc.querySelector('#workspace-content').hidden,true);assert.equal(a.doc.querySelectorAll('.todo').length,2);
    assert.equal(a.doc.querySelector('#board-count').textContent,'2');
    assert.equal(a.w.localStorage.getItem('ss14-workspace-collapsed'),'true');
    a.click('#toggle-workspace');assert.equal(a.doc.querySelector('#workspace-content').hidden,false);assert.equal(a.doc.querySelectorAll('.todo').length,2);
  }finally{a.close();}
});

test('Dexalin Plus automatically lists oxygen, plasma, carbon and iron and preserves steps',()=>{
  const {WorkbenchChemistry}=require('../src/features/recipes/chemistry.js');
  const result=WorkbenchChemistry.expand(byId.get('reaction:DexalinPlus'),3,data);
  assert.deepEqual(result.ingredients.map(i=>i.id),['Oxygen','Plasma','Carbon','Iron']);
  assert.deepEqual(result.ingredients.map(i=>i.amount),[2,1,3,3]);
  assert.equal(result.ingredients[1].catalyst,true);assert.deepEqual(result.ingredients[0].via,['дексалин']);
  assert.equal(result.steps[0].recipe.id,'reaction:Dexalin');
  const a=app();try{
    a.search('DexalinPlus');a.click('[data-add="reaction:DexalinPlus"]');
    assert.equal(a.doc.querySelectorAll('.todo [data-expand]').length,0);
    assert.equal(a.doc.querySelectorAll('.todo [data-chem-check]').length,4);
    assert.match(a.doc.querySelector('.chem-steps').textContent,/380 K/);
    a.click('.todo [data-chem-check]');assert.ok(JSON.parse(a.saved())[0].checked[0].startsWith('chem:'));
  }finally{a.close();}
});

test('chemical expansion merges repeated materials, keeps catalyst roles and terminates cycles',()=>{
  const {WorkbenchChemistry}=require('../src/features/recipes/chemistry.js');
  const item=(id,amount=1,catalyst=false)=>({key:'reagent:'+id,id,name:id,amount,catalyst,unit:'ед.'});
  const recipe=(id,ingredients)=>({id:'reaction:'+id,prototype:id,ingredients,outputs:[item(id)],conditions:[]});
  const root=recipe('Final',[item('A'),item('B'),item('Iron',2)]);
  const list=[root,recipe('A',[item('Iron',3),item('Plasma',1,true)]),recipe('B',[item('Iron',4),item('Plasma',2,true)])];
  const source={recipes:list,byOutput:Object.fromEntries(list.map(r=>[r.outputs[0].key,[r.id]]))};
  let plan=WorkbenchChemistry.expand(root,2,source);
  assert.equal(plan.ingredients.find(i=>i.id==='Iron').amount,18);
  assert.equal(plan.ingredients.find(i=>i.id==='Plasma').amount,2);
  const cyclic=[recipe('A',[item('B')]),recipe('B',[item('A')])];
  plan=WorkbenchChemistry.expand(cyclic[0],1,{recipes:cyclic,byOutput:{'reagent:A':['reaction:A'],'reagent:B':['reaction:B']}});
  assert.equal(plan.warnings.length,1);assert.equal(plan.ingredients[0].id,'A');
});

test('200 units means 200 output for chemistry and drinks, with proportional ingredients and persistence',()=>{
  for(const id of ['reaction:DexalinPlus','reaction:Dylovene','reaction:French75']){
    const a=app();let saved;try{
      const r=byId.get(id);a.search(r.prototype);a.click(`[data-add="${id}"]`);
      const input=a.doc.querySelector('.todo [data-output]');input.value=200;input.dispatchEvent(new a.w.Event('change',{bubbles:true}));
      const card=JSON.parse(a.saved())[0];assert.equal(card.targetAmount,200);
      assert.ok(Math.abs(card.scale*r.outputs[0].amount-200)<1e-8,id);
      assert.match(a.doc.querySelector('.todo .yield').textContent,/200 ед\./);
      assert.equal(Number(a.doc.querySelector('[data-output]').value),200);
      if(id==='reaction:Dylovene'){
        const quantities=[...a.doc.querySelectorAll('.chem-stock .ingredients .quantity')].map(el=>Number(el.textContent.replace(' ед.','').replace(',','.')));
        assert.equal(quantities.length,3);for(const n of quantities)assert.ok(Math.abs(n-200/3)<.001);
      }
      if(id==='reaction:French75'){
        const displayed=Number(a.doc.querySelector('.ingredients .quantity').textContent.replace(' ед.','').replace(',','.'));
        assert.ok(Math.abs(displayed-r.ingredients[0].amount*200/r.outputs[0].amount)<.001);
      }
      saved=a.saved();
    }finally{a.close();}
    const restored=app(saved);try{assert.equal(Number(restored.doc.querySelector('[data-output]').value),200);assert.match(restored.doc.querySelector('.yield').textContent,/200 ед\./);}finally{restored.close();}
  }
});

test('food output counts, batch surplus and preview output calculation',()=>{
  const a=app();try{
    a.search('FoodDoughFlat');a.click('[data-add="slice:FoodDoughFlat"]');
    const input=a.doc.querySelector('[data-output]');assert.equal(Number(input.value),3);
    input.value=7;input.dispatchEvent(new a.w.Event('change',{bubbles:true}));
    assert.equal(JSON.parse(a.saved())[0].scale,3);assert.equal(Number(a.doc.querySelector('[data-output]').value),7);
    assert.match(a.doc.querySelector('.yield').textContent,/9 шт\./);assert.match(a.doc.querySelector('.batch-note').textContent,/Нужно 7 шт/);
    const before=a.saved();a.click('.todo [data-preview]');
    const target=a.doc.querySelector('[data-preview-output]');assert.equal(Number(target.value),7);target.value=12;target.dispatchEvent(new a.w.Event('change',{bubbles:true}));
    assert.match(a.doc.querySelector('#preview-content .yield').textContent,/12 шт\./);assert.equal(a.saved(),before);
  }finally{a.close();}
});

test('small liquid outputs survive reload and multiple products can be selected',()=>{
  const a=app();let saved;try{
    a.search('Dylovene');a.click('[data-add="reaction:Dylovene"]');
    const input=a.doc.querySelector('[data-output]');input.value=.001;input.dispatchEvent(new a.w.Event('change',{bubbles:true}));saved=a.saved();
  }finally{a.close();}
  const b=app(saved);try{assert.ok(Math.abs(JSON.parse(b.saved())[0].scale-.001/3)<1e-12);assert.equal(Number(b.doc.querySelector('[data-output]').value),.001);}finally{b.close();}
  const multi=data.recipes.find(r=>r.outputs.length>1&&r.outputs.every(o=>o.unit==='ед.')&&!r.quantized&&!r.ingredients.some(i=>i.unit==='шт.'));
  assert.ok(multi);
  const c=app();try{
    c.search(multi.prototype);c.click(`[data-add="${multi.id}"]`);const select=c.doc.querySelector('[data-output-key]');select.value=multi.outputs[1].key;select.dispatchEvent(new c.w.Event('change',{bubbles:true}));
    const target=c.doc.querySelector('[data-output]');target.value=200;target.dispatchEvent(new c.w.Event('change',{bubbles:true}));
    const state=JSON.parse(c.saved())[0];assert.equal(state.outputKey,multi.outputs[1].key);assert.ok(Math.abs(state.scale*multi.outputs[1].amount-200)<1e-8);
  }finally{c.close();}
});

test('workspace height accepts 2000 pixels without a cap and restores after reload',()=>{
  const a=app();let height;try{
    const input=a.doc.querySelector('#workspace-height');input.value=2000;input.dispatchEvent(new a.w.Event('change',{bubbles:true}));
    assert.equal(a.doc.querySelector('#viewport').style.height,'2000px');
    assert.equal(a.doc.querySelector('.workspace').classList.contains('is-tall'),true);
    height=a.w.localStorage.getItem('ss14-workspace-height');assert.equal(height,'2000');
    assert.match(text('src/styles/enhancements.css'),/\.workspace #viewport\{[^}]*max-height:none/);
    a.click('#toggle-workspace');a.click('#workspace-jump');assert.equal(a.doc.querySelector('#workspace-content').hidden,false);
    assert.equal(a.doc.querySelector('#viewport').style.height,'2000px');
  }finally{a.close();}
  const b=app(undefined,{'ss14-workspace-height':height});try{
    assert.equal(b.doc.querySelector('#viewport').style.height,'2000px');assert.equal(b.doc.querySelector('#workspace-height').value,'2000');
    b.click('#workspace-size-reset');assert.equal(b.doc.querySelector('#viewport').style.height,'475px');
  }finally{b.close();}
});

test('mutagen guide opens its real recipe and adds it to the workspace',()=>{
  const a=app();try{
    a.click('#tab-botany');a.click('[data-botany-section="mutagen"]');
    assert.match(a.doc.querySelector('#botany-content').textContent,/Начните с 1 ед/);
    assert.equal(a.doc.querySelector('#botany-search').closest('label').hidden,true);
    const recipe=byId.get('reaction:UnstableMutagen');
    assert.deepEqual(Array.from(recipe.ingredients,i=>[i.id,i.amount]),[['Radium',1],['Phosphorus',1],['Chlorine',1]]);
    assert.equal(recipe.outputs.find(o=>o.id==='UnstableMutagen').amount,3);
    a.click('[data-botany-add="reaction:UnstableMutagen"]');
    assert.match(a.doc.querySelector('#board').textContent,/мутаген/i);
    a.click('[data-botany-section="plants"]');
    assert.equal(a.doc.querySelector('#botany-search').closest('label').hidden,false);
  }finally{a.close();}
});
test('botany data includes every species edge, full effect types and cryoxadone care',()=>{
  const b=data.botany,plants=new Map(b.plants.map(p=>[p.id,p]));
  assert.ok(plants.size>=90);assert.ok(b.randomMutations.length>=27);assert.ok(b.plantReagents.length>=44);
  for(const p of plants.values())for(const id of p.mutations)assert.ok(plants.has(id),id);
  assert.deepEqual(Array.from(plants.get('wheat').mutations),['meatwheat']);
  for(const m of b.randomMutations)assert.ok(m.effect?.__effect,m.name);
  const cryo=b.plantReagents.find(r=>r.id==='Cryoxadone');
  assert.ok(cryo.effects.some(e=>e.type==='PlantCryoxadone'));assert.ok(cryo.effects.some(e=>e.type==='PlantAdjustHealth'&&e.amount===5));
  assert.ok(b.randomChemicals.some(r=>r.id==='Cryoxadone'));
});

test('botany tab shows meatwheat steps and reagent recipes without losing the workspace',async()=>{
  const a=app();try{
    a.search('RecipeBun');a.click('[data-add="microwave:RecipeBun"]');a.click('#toggle-workspace');
    a.click('#tab-botany');assert.equal(a.doc.querySelector('#botany').hidden,false);assert.equal(a.doc.querySelector('#catalog').hidden,true);
    const input=a.doc.querySelector('#botany-search');input.value='мясная пшеница';input.dispatchEvent(new a.w.Event('input',{bubbles:true}));
    assert.match(a.doc.querySelector('.plant-chain').textContent,/пшеницы.*мясопшеницы/);
    assert.match(a.doc.querySelector('.plant-steps').textContent,/мутаген/);
    assert.ok(a.doc.querySelector('[data-botany-add="reaction:Cryoxadone"]'));
    assert.deepEqual(JSON.parse(JSON.stringify(a.w.BotanyGuides.pathsTo('meatwheat'))),[['wheat','meatwheat']]);
    a.click('[data-botany-add="reaction:Cryoxadone"]');await new Promise(resolve=>a.w.requestAnimationFrame(resolve));
    assert.equal(a.doc.querySelectorAll('.todo').length,2);assert.equal(a.doc.querySelector('#workspace-content').hidden,true);
    assert.ok(JSON.parse(a.saved()).some(c=>c.recipeId==='reaction:Cryoxadone'));
    input.value='криоксадон';input.dispatchEvent(new a.w.Event('input',{bubbles:true}));a.click('[data-botany-section="reagents"]');
    assert.match(a.doc.querySelector('#botany-content').textContent,/Омолаживает/);
    a.click('[data-botany-section="mutations"]');assert.match(a.doc.querySelector('.random-chemicals').textContent,/криоксадон/);
    a.click('#tab-recipes');assert.equal(a.doc.querySelector('#catalog').hidden,false);assert.equal(a.doc.querySelectorAll('.todo').length,2);
  }finally{a.close();}
});

test('all mutation targets have a finite valid step-by-step path',()=>{
  const a=app();try{
    for(const p of data.botany.plants)for(const id of p.mutations){
      const routes=a.w.BotanyGuides.pathsTo(id);assert.ok(routes.length,id);
      for(const route of routes){assert.equal(route.at(-1),id);assert.equal(new Set(route).size,route.length);for(let i=1;i<route.length;i++)assert.ok(data.botany.plants.find(p=>p.id===route[i-1]).mutations.includes(route[i]));}
    }
  }finally{a.close();}
});

test('player guide keeps attribution, stock amounts, original numbering and all main sections',()=>{
  const a=app();try{
    const guide=a.w.PLAYER_GUIDES[0];assert.equal(guide.author,'Травница Луна');assert.equal(guide.stock.length,18);
    assert.equal(guide.stock.find(s=>s.name==='углерод').amount,800);
    assert.deepEqual(Array.from(guide.sections,s=>s.id),['1','1.1','2','3','4','5','5.1','6','8','9','end']);
    assert.ok(fs.existsSync(path.join(projectRoot,guide.source)));
    const paragraphs=guide.sections.flatMap(s=>s.blocks.flatMap(b=>b.paragraphs)).join(' ');
    assert.match(paragraphs,/4 секунды/);assert.match(paragraphs,/1000унц/);assert.match(paragraphs,/30 сек/);
    for(const section of guide.sections)for(const block of section.blocks)if(block.recipeId)assert.ok(byId.has(block.recipeId),block.recipeId);
    a.click('#tab-players');assert.equal(a.doc.querySelector('#players').hidden,false);assert.equal(a.doc.querySelector('#catalog').hidden,true);assert.equal(a.doc.querySelector('#botany').hidden,true);
    a.click('[data-guide-filter="5.1"]');assert.match(a.doc.querySelector('.guide-sections').textContent,/Доксарубиксадон/);
    a.click('#tab-botany');assert.equal(a.doc.querySelector('#players').hidden,true);a.click('#tab-recipes');assert.equal(a.doc.querySelector('#catalog').hidden,false);
  }finally{a.close();}
});

test('player guide search, persistent checklist, recipe preview and add preserve collapsed board',async()=>{
  const a=app();let marks;try{
    a.click('#tab-players');a.click('[data-guide-check="stock:0"]');marks=a.w.localStorage.getItem('ss14-player-guide-luna-chemistry');
    const input=a.doc.querySelector('#player-search');input.value='Бикаридин';input.dispatchEvent(new a.w.Event('input',{bubbles:true}));
    assert.ok(a.doc.querySelector('.guide-sections [data-preview="reaction:Bicaridine"]'));
    a.click('.guide-sections [data-preview="reaction:Bicaridine"]');assert.equal(a.doc.querySelector('#recipe-preview').open,true);assert.equal(a.doc.querySelectorAll('.todo').length,0);a.click('#close-preview');
    a.click('#toggle-workspace');a.click('[data-guide-add="player:luna-chemistry:2:0"]');await new Promise(resolve=>a.w.requestAnimationFrame(resolve));
    assert.equal(a.doc.querySelector('#workspace-content').hidden,true);assert.equal(JSON.parse(a.saved())[0].recipeId,'player:luna-chemistry:2:0');
    input.value='несуществующийтекст123';input.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.ok(a.doc.querySelector('.guide-empty'));
  }finally{a.close();}
  const b=app(undefined,{'ss14-player-guide-luna-chemistry':marks});try{assert.equal(b.doc.querySelector('[data-guide-check="stock:0"]').checked,true);}finally{b.close();}
});

test('author batch cards use author amounts, preserve steps and survive reload',()=>{
  const a=app();let saved;try{
    a.click('#tab-players');a.click('[data-guide-filter="2"]');a.click('[data-guide-add="player:luna-chemistry:2:0"]');
    const card=a.doc.querySelector('.player-todo');assert.ok(card);
    assert.match(card.textContent,/Травница Луна/);assert.match(card.querySelector('.yield').textContent,/300 ед/);
    assert.deepEqual([...card.querySelectorAll('.ingredients .quantity')].map(el=>el.textContent),['50 ед.','50 ед.','200 ед.']);
    assert.match(card.querySelector('.player-card-steps').textContent,/100 ина/);
    assert.equal(card.querySelectorAll('[data-output]').length,0);
    a.click('.player-todo [data-ingredient="0"]');a.click('.player-todo [data-chem-check="player-step:0"]');a.click('.player-todo [data-done]');
    const header=card.querySelector('.todo-header');header.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));saved=a.saved();
    assert.equal(JSON.parse(saved)[0].x,34);assert.equal(JSON.parse(saved)[0].done,true);
  }finally{a.close();}
  const b=app(saved);try{
    assert.ok(b.doc.querySelector('.player-todo'));assert.equal(b.doc.querySelector('[data-ingredient="0"]').checked,true);
    assert.equal(b.doc.querySelector('[data-chem-check="player-step:0"]').checked,true);
    assert.equal(b.doc.querySelector('[data-done]').checked,true);
    b.click('.player-todo [data-preview="reaction:Bicaridine"]');assert.equal(b.doc.querySelector('#recipe-preview').open,true);assert.equal(b.doc.querySelectorAll('.todo').length,1);
  }finally{b.close();}
});

test('different stages retain independent author quantities and batch IDs',()=>{
  const a=app();try{
    const variants=a.w.PLAYER_RECIPES.filter(r=>r.name==='Фалангимин');assert.equal(variants.length,2);
    assert.notEqual(variants[0].id,variants[1].id);
    assert.equal(variants.find(r=>r.stage==='1.1').ingredients[0].quantity,66);
    assert.equal(variants.find(r=>r.stage==='5').ingredients[0].quantity,100);
    for(const r of a.w.PLAYER_RECIPES){assert.ok(r.ingredients.length);assert.ok(r.steps.length);assert.ok(r.author);}
  }finally{a.close();}
});

test('chemical cards show the process first and collapse aggregate stock; player cards stay compact',()=>{
  const a=app();try{
    a.search('DexalinPlus');a.click('[data-add="reaction:DexalinPlus"]');
    const steps=a.doc.querySelector('.todo .chem-steps');assert.ok(steps);assert.equal(steps.closest('details'),null);assert.equal(a.doc.querySelector('.chem-stock').open,false);
    assert.equal(a.doc.querySelectorAll('.todo [data-chem-check]').length,4);
    assert.match(steps.textContent,/Финальное смешивание/);
    a.click('#tab-players');a.click('[data-guide-filter="2"]');a.click('[data-guide-add="player:luna-chemistry:2:0"]');
    assert.equal(a.doc.querySelector('.player-card-steps').open,false);assert.equal(a.doc.querySelectorAll('.player-todo .ingredients li').length,3);
  }finally{a.close();}
});

test('chemistry defaults to 200 output, exposes staged doses and persists step progress with volume reset',()=>{
  const a=app();let saved;try{
    a.search('DexalinPlus');a.click('[data-add="reaction:DexalinPlus"]');
    assert.equal(Number(a.doc.querySelector('.chem-todo [data-output]').value),200);
    assert.equal(a.doc.querySelector('.chem-todo .todo-body').firstElementChild.className,'output-settings');
    assert.equal(a.doc.querySelectorAll('.chem-stage').length,2);
    assert.match(a.doc.querySelector('.chem-final').textContent,/Взять готовым из шага 1/);
    assert.match(a.doc.querySelector('.chem-stage').textContent,/66,667/);
    a.click('[data-chem-step]');assert.ok(a.doc.querySelector('.chem-stage.is-complete'));saved=a.saved();
    a.click('.chem-todo [data-chem-volume="100"]');assert.equal(Number(a.doc.querySelector('[data-output]').value),100);assert.equal(a.doc.querySelector('[data-chem-step]').checked,false);assert.match(a.doc.querySelector('.chem-final').textContent,/33,333/);
    const count=a.doc.querySelectorAll('.todo').length;a.click('.chem-todo [data-preview]');assert.equal(a.doc.querySelectorAll('.todo').length,count);assert.equal(Number(a.doc.querySelector('[data-preview-output]').value),100);
    a.click('.chem-preview [data-chem-volume="200"]');assert.equal(Number(a.doc.querySelector('[data-preview-output]').value),200);assert.equal(Number(a.doc.querySelector('.todo [data-output]').value),100);assert.equal(a.doc.querySelectorAll('.chem-preview input[type="checkbox"]').length,0);
  }finally{a.close();}
  const restored=app(saved);try{assert.equal(restored.doc.querySelector('[data-chem-step]').checked,true);assert.equal(Number(restored.doc.querySelector('[data-output]').value),200);}finally{restored.close();}
});

test('chef menu picks ten unique finished dishes from varied groups and excludes existing dishes',()=>{
  const {ChefMenu}=require('../src/features/recipes/chef-menu.js');
  const first=ChefMenu.pickMenu(data.recipes,10,[],()=>.5);assert.equal(first.length,10);
  assert.equal(new Set(first.map(r=>r.outputs[0].key)).size,10);assert.ok(new Set(first.map(r=>r.group)).size>=8);
  assert.ok(first.every(r=>r.id.startsWith('microwave:')&&r.category==='food'&&!r.note));
  const occupied=first.map(r=>r.outputs[0].key),second=ChefMenu.pickMenu(data.recipes,10,occupied,()=>.5);
  assert.equal(second.length,10);assert.ok(second.every(r=>!occupied.includes(r.outputs[0].key)));
  assert.equal(ChefMenu.pickMenu([],10).length,0);
});

test('chef menu button adds ten saved cards without opening or scrolling a collapsed workspace',async()=>{
  const a=app();let saved;try{
    assert.equal(a.doc.querySelector('#chef-tools').hidden,true);a.click('[data-category="food"]');assert.equal(a.doc.querySelector('#chef-tools').hidden,false);
    a.click('#toggle-workspace');let scrollCalls=0;a.w.HTMLElement.prototype.scrollIntoView=function(){scrollCalls++;};a.w.HTMLElement.prototype.scrollTo=function(){scrollCalls++;};
    a.click('#chef-menu');await new Promise(resolve=>a.w.requestAnimationFrame(resolve));
    assert.equal(a.doc.querySelectorAll('.todo').length,10);assert.equal(a.doc.querySelector('#workspace-content').hidden,true);assert.equal(scrollCalls,0);
    a.click('#chef-menu');const cards=JSON.parse(a.saved());assert.equal(cards.length,20);assert.equal(new Set(cards.map(c=>byId.get(c.recipeId).outputs[0].key)).size,20);
    assert.equal(new Set(cards.map(c=>c.x+':'+c.y)).size,20);saved=a.saved();
  }finally{a.close();}
  const b=app(saved);try{assert.equal(b.doc.querySelectorAll('.todo').length,20);}finally{b.close();}
});

test('security compact cards select directly, hover only shows an example, and explanations open separately',()=>{
  const a=securityApp();try{
    assert.equal(a.doc.querySelector('#security-form,.security-report'),null);assert.equal(a.w.SecurityDesk.documentText,undefined);
    const card=a.doc.querySelector('[data-charge="100"]');card.dispatchEvent(new a.w.Event('pointerover',{bubbles:true}));
    assert.equal(a.doc.querySelector('#law-tooltip').textContent,'Учебный пример: '+a.w.SECURITY_DATA.laws.find(l=>l.code==='100').example);
    a.click('[data-charge="100"] .law-label');assert.equal(a.doc.querySelector('[data-charge="100"]').getAttribute('aria-pressed'),'true');assert.equal(a.doc.querySelector('#law-dialog').open,false);
    a.click('[data-law="100"]');assert.equal(a.doc.querySelector('#law-dialog').open,true);assert.equal(a.doc.querySelectorAll('[data-remove-charge]').length,1);assert.match(a.doc.querySelector('#law-dialog-content').textContent,/Граффити/);a.click('#law-close');
    a.click('[data-charge="100"]');assert.equal(a.doc.querySelectorAll('[data-remove-charge]').length,0);
  }finally{a.close();}
});

test('botany uses examination and pollen transfer instead of plant analyzers',()=>{
  const a=app();try{
    a.click('#tab-botany');assert.doesNotMatch(a.doc.querySelector('#botany-content').textContent,/анализатор/i);assert.match(a.doc.querySelector('#botany-content').textContent,/Здесь растёт/);
    a.click('.botany-tabs [data-botany-section="swabs"]');assert.match(a.doc.querySelector('#swab-plan').textContent,/неизвестен/);
    const donor=a.doc.querySelector('#swab-donor'),receiver=a.doc.querySelector('#swab-receiver');donor.value='wheat';receiver.value='meatwheat';receiver.dispatchEvent(new a.w.Event('change',{bubbles:true}));
    const plan=a.doc.querySelector('#swab-plan').textContent;assert.match(plan,/прежнего растения Б/);assert.match(plan,/50%/);assert.match(plan,/70%/);assert.match(plan,/примерно 2 секунды/);assert.match(plan,/Палочка не превращает/);
    for(const section of ['plants','mutagen','mutations']){a.click('.botany-tabs [data-botany-section="'+section+'"]');assert.doesNotMatch(a.doc.querySelector('#botany-content').textContent,/анализатор/i);}
  }finally{a.close();}
});
