const {projectRoot,gameRoot}=require('../scripts/project-paths.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {SecurityDesk:{calculate}}=require('../src/features/security/security.js');
const vm=require('node:vm'),fs=require('node:fs');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(projectRoot+'/data/security-data.js','utf8'),ctx);
const laws=(...codes)=>codes.map(code=>ctx.window.SECURITY_DATA.laws.find(l=>l.code===code));
test('SS220 medical care preserves the sentence, including permanent imprisonment',()=>{
  const r=calculate(laws('200'),{},{medical:true});assert.equal(r.minutes,10);assert.match(r.notes.join(' '),/Таймер продолжает/);
  assert.equal(calculate(laws('400'),{'400':{repeat:4}},{medical:true}).kind,'permanent');
  assert.equal(calculate([],{},{medical:true}).kind,'medical');
});
test('SS220 conversion, emergency relocation and release have distinct outcomes',()=>{
  assert.equal(calculate(laws('502'),{},{conversion:'controlled'}).kind,'conversion');
  const freed=calculate(laws('100','200'),{},{conversion:'restored'});assert.equal(freed.kind,'released');assert.equal(freed.errors.length,0);assert.equal(freed.minutes,null);
  const moved=calculate(laws('200'),{},{threat:'move'});assert.equal(moved.kind,'transfer');assert.match(moved.steps.join(' '),/10 мин/);
  const released=calculate(laws('502'),{},{threat:'release'});assert.equal(released.kind,'emergency');assert.match(released.notes.join(' '),/не снятие обвинений/);
});
test('SS220 approved parole and an explicit Central Command directive override the displayed action',()=>{
  const r=calculate(laws('200'),{},{parole:true});assert.equal(r.kind,'parole');assert.equal(r.minutes,null);assert.match(r.notes.join(' '),/до первого нарушения/);
  assert.equal(calculate(laws('200'),{},{parole:true,conversion:'controlled'}).kind,'conversion');
  assert.equal(calculate(laws('200'),{},{directive:true}).kind,'conflict');
  const directive=calculate(laws('100','200'),{},{directive:true,directiveText:'Освободить по приказу №7',surrender:true});assert.equal(directive.kind,'directive');assert.equal(directive.minutes,null);assert.equal(directive.errors.length,0);assert.match(directive.notes.join(' '),/№7/);
});
test('SS220 accessory without charges against principal uses five minutes without a second 0.8 reduction',()=>{
  assert.equal(calculate([],{},{unaccusedAccessory:true}).minutes,5);
  assert.equal(calculate([],{},{unaccusedAccessory:true,surrender:true}).minutes,2.5);
  assert.equal(calculate(laws('200'),{},{unaccusedAccessory:true}).kind,'conflict');
});
test('SS220 terms, warnings and the 1.5 aggregation cap',()=>{
  assert.equal(calculate([]).kind,'empty');
  for(const [code,n] of [['100',5],['200',10],['300',15],['400',30]])assert.equal(calculate(laws(code)).minutes,n);
  assert.equal(calculate(laws('100'),{'100':{minutes:0}}).kind,'warning');
  assert.equal(calculate(laws('300'),{'300':{minutes:20}}).minutes,20);
  assert.equal(calculate(laws('300'),{'300':{minutes:17}}).kind,'conflict');
  assert.equal(calculate(laws('200','207')).minutes,15);
  assert.equal(calculate(laws('400','401')).minutes,45);
  assert.equal(calculate(laws('108','207')).minutes,15);
});
test('SS220 reductions apply consecutively after increases and respect accessory roles',()=>{
  assert.equal(calculate(laws('200'),{},{refusal:true,surrender:true}).minutes,7.5);
  assert.equal(calculate(laws('200'),{},{cooperation:true,surrender:true}).minutes,2.5);
  assert.equal(calculate(laws('200'),{'200':{accomplice:true}}).minutes,8);
  assert.equal(calculate(laws('300'),{'300':{accomplice:true}}).minutes,15);
  assert.equal(calculate(laws('200','207'),{'200':{accomplice:true}}).kind,'conflict');
  assert.equal(calculate(laws('200'),{'200':{repeat:2}},{refusal:true}).minutes,30);
  assert.equal(calculate(laws('200'),{'200':{repeat:2}},{refusal:true,order:'refusal-first'}).minutes,25);
});
test('SS220 permanent and special verdicts never masquerade as a finite cell timer',()=>{
  assert.equal(calculate(laws('400'),{'400':{repeat:4}}).kind,'permanent');
  assert.equal(calculate(laws('400'),{'400':{repeat:4}},{surrender:true}).kind,'timed');
  assert.equal(calculate(laws('100'),{'100':{repeat:5}},{surrender:true,cooperation:true}).kind,'permanent');
  assert.equal(calculate(laws('502'),{},{surrender:true}).minutes,null);
  assert.equal(calculate(laws('502'),{},{surrender:true}).kind,'special');
  const ninety=calculate(laws('400','401'),{'400':{repeat:2},'401':{repeat:2}},{refusal:true});
  assert.equal(ninety.minutes,97.5);assert.ok(ninety.notes.some(n=>n.includes('90')));
  const exact=calculate(laws('400'),{'400':{repeat:4}},{refusal:true});
  assert.equal(exact.minutes,90);assert.ok(!exact.notes.some(n=>n.includes('90')));
});
test('SS220 incompatible crimes, damage exception and confirmed exemptions',()=>{
  assert.equal(calculate(laws('100','200')).kind,'conflict');
  assert.equal(calculate(laws('302','309')).kind,'conflict');
  assert.equal(calculate(laws('100','208')).kind,'conflict');
  assert.equal(calculate(laws('100','208'),{},{independentDamage:true}).minutes,15);
  assert.equal(calculate(laws('100','200'),{'100':{exemption:'necessity'}}).minutes,10);
  assert.equal(calculate(laws('502'),{'502':{exemption:'defense'}}).kind,'released');
  assert.equal(calculate(laws('200'),{},{review:true}).kind,'conflict');
  assert.equal(calculate(laws('200'),{'200':{minutes:NaN}}).kind,'conflict');
});
