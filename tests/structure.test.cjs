const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('jsdom');
const {projectRoot}=require('../scripts/project-paths.cjs');
test('entrypoint loads every component and data dependency in order',()=>{
 const dom=new JSDOM(fs.readFileSync(path.join(projectRoot,'index.html'),'utf8'),{runScripts:'outside-only',url:'http://localhost',pretendToBeVisual:true});
 const w=dom.window,errors=[];w.addEventListener('error',e=>errors.push(e.message));w.ResizeObserver=class{observe(){}};w.HTMLElement.prototype.scrollIntoView=function(){};w.HTMLElement.prototype.scrollTo=function(){};w.HTMLElement.prototype.animate=function(){};w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;};
 try{for(const el of w.document.querySelectorAll('script[src],link[rel=stylesheet]')){const name=el.getAttribute('src')||el.getAttribute('href');assert.ok(fs.existsSync(path.join(projectRoot,name)),name);if(el.tagName==='SCRIPT')w.eval(fs.readFileSync(path.join(projectRoot,name),'utf8'));}
 for(const id of ['medical','botany','scientist','engineering','players','security']){w.document.getElementById('tab-'+id).click();assert.equal(w.document.getElementById(id).hidden,false);}
 w.document.getElementById('tab-medical').click();assert.equal(w.document.querySelectorAll('.med-card').length,33);assert.deepEqual(errors,[]);
 }finally{w.document.getElementById('board').replaceChildren();w.close();}
});
