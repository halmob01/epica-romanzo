'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const engine=require('../engine.js');
const stories=require('../storie.js');
const art=require('../epica-map.js');

function fakeBrowser(store=new Map()) {
  const ids=['landing','continue','app','headline','storyName','map','hud','chapterTag','turnTag','progress','panel','prologue'];
  const elements=Object.fromEntries(ids.map(id=>[id,{
    id,hidden:id!=='landing',innerHTML:'',textContent:'',dataset:{},
    attributes:{},
    setAttribute(k,v){this.attributes[k]=v;},
    querySelector(){return {focus(){}};}
  }]));
  const covers=[{dataset:{cover:'ettore'},innerHTML:''},{dataset:{cover:'achille'},innerHTML:''}];
  const events={};
  const document={
    getElementById(id){if(!elements[id]) throw new Error('Missing element: '+id);return elements[id];},
    querySelectorAll(selector){return selector==='[data-cover]'?covers:[];},
    addEventListener(name,handler){events[name]=handler;}
  };
  const localStorage={
    getItem(key){return store.has(key)?store.get(key):null;},
    setItem(key,value){store.set(key,String(value));},
    removeItem(key){store.delete(key);}
  };
  const window={EpicaEngine:engine,EpicaStories:stories,EpicaMap:art,scrollTo(){}};
  const context={document,window,localStorage,console};
  const code=fs.readFileSync(path.join(__dirname,'..','epica-app.js'),'utf8');
  vm.runInNewContext(code,context,{filename:'epica-app.js',timeout:1500});
  function click(selector,dataset) {
    assert.ok(events.click);
    const target={closest:(query)=>query===selector?{dataset}:null};
    events.click({target});
  }
  function action(action,story){click('[data-action]',{action,story});}
  function choice(choice){click('[data-choice]',{choice});}
  function role(role){click('[data-role]',{role});}
  return {elements,covers,store,events,action,choice,role};
}

test('Ettore: dalla prima card al riepilogo, mappa e costi narrati',()=>{
  const p=fakeBrowser();
  assert.ok(p.covers.every(c=>c.innerHTML.includes('<svg')));
  p.action('start','ettore');
  assert.equal(p.elements.app.hidden,false);
  assert.equal(p.elements.prologue.hidden,false);
  assert.match(p.elements.prologue.innerHTML,/La città assediata/);
  for(let i=0;i<5;i++)p.action('next');
  assert.equal(p.elements.prologue.hidden,true);
  assert.match(p.elements.panel.innerHTML,/Le famiglie chiedono pane/);
  p.choice('famiglie');
  assert.match(p.elements.hud.innerHTML,/41/);
  assert.match(p.elements.panel.innerHTML,/Le famiglie ricevono il pane/);
  p.action('next');
  p.choice('portone');p.action('next');
  p.choice('case');p.action('next');
  for(let i=0;i<3;i++)p.action('next');
  assert.match(p.elements.prologue.innerHTML,/Una persona, tre legami/);
  assert.match(p.elements.prologue.innerHTML,/disabled aria-disabled="true"/);
  p.action('next');
  assert.match(p.elements.prologue.innerHTML,/Una persona, tre legami/);
  p.role('marito');p.role('padre');p.role('difensore');
  assert.match(p.elements.prologue.innerHTML,/3\/3 legami esplorati/);
  assert.doesNotMatch(p.elements.prologue.innerHTML,/disabled aria-disabled="true"/);
  assert.match(p.elements.prologue.innerHTML,/Ettore difende anche le famiglie/);
  p.action('next');
  assert.match(p.elements.panel.innerHTML,/Una vita, un destino comune/);
  p.choice('ruoli');p.action('next');p.action('next');
  assert.match(p.elements.panel.innerHTML,/Le scelte che hai fatto/);
  assert.match(p.elements.panel.innerHTML,/Hai favorito:/);
  assert.match(p.elements.panel.innerHTML,/Il costo:/);
  assert.match(p.elements.panel.innerHTML,/Non sono un voto/);
  assert.equal(p.elements.prologue.hidden,true);
});
test('salvataggio della storia ripreso da una nuova pagina',()=>{
  const store=new Map(), first=fakeBrowser(store);
  first.action('start','achille');
  first.action('next');first.action('next');
  first.choice('armatura');
  const second=fakeBrowser(store);
  assert.equal(second.elements.continue.hidden,false);
  assert.match(second.elements.continue.textContent,/ACHILLE/);
  second.action('continue');
  assert.match(second.elements.panel.innerHTML,/Patroclo/);
  second.action('next');
  assert.match(second.elements.prologue.innerHTML,/Che cosa accade nell’Iliade/);
});
test('il capitolo Ettore è esplorabile anche da tastiera',()=>{
  const p=fakeBrowser();
  p.action('start','ettore');
  assert.ok(p.events.keydown,'gestore tastiera registrato');
  p.events.keydown({key:'ArrowRight',repeat:false,altKey:false,ctrlKey:false,metaKey:false});
  assert.match(p.elements.prologue.innerHTML,/Il difensore/);
});
