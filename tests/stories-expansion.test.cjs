'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../engine.js');
const stories=require('../storie.js');
const art=require('../epica-map.js');

function run(id, variant=0) {
  const story=stories[id], seen=[], decisions=[];
  let session=engine.newSession(story),steps=0;
  while(session.phase!=='end'&&++steps<120) {
    const scene=engine.currentScene(story,session);
    if(session.phase==='outcome') {session=engine.advance(story,session);continue;}
    seen.push(scene.id);
    if(scene.type==='narrative') session=engine.advance(story,session);
    else {
      const ch=scene.choices[(variant+decisions.length)%scene.choices.length];
      decisions.push({scene:scene.id,choice:ch.id});
      session=engine.select(story,session,ch.id);
      for(const value of Object.values(session.values))assert.ok(value>=0&&value<=100);
      assert.equal(session.phase,'outcome');
      assert.ok(session.last.why.length>20,'motivazione sostanziale');
    }
    assert.ok(engine.restore(story,JSON.stringify(session)),'ripristino dopo ogni passo');
  }
  assert.ok(steps<120,'nessun loop');
  assert.equal(session.phase,'end');
  return {story,session,seen,decisions};
}

test('Penelope e contemporaneità condividono il motore senza dipendere da Ettore',()=>{
  assert.equal(engine.validateStory(stories.penelope),stories.penelope);
  assert.equal(engine.validateStory(stories.oggi),stories.oggi);
  assert.deepEqual(Object.keys(engine.newSession(stories.penelope).values),['tempo','sostegno','casa']);
  assert.deepEqual(Object.keys(engine.newSession(stories.oggi).values),['futuro','legami','insieme']);
});
test('Ogni variante del percorso Penelope arriva al riepilogo',()=>{
  for(let n=0;n<3;n++){
    const result=run('penelope',n);
    assert.equal(result.decisions.filter(x=>['messaggio','telemaco'].includes(x.scene)).length,2);
    assert.ok(result.seen.includes('ritorno'));
    assert.ok(result.seen.includes('ruoli-itaca'));
    assert.ok(result.seen.includes('domanda-itaca'));
  }
});
test('Ogni variante del capitolo contemporaneo conserva il destino collettivo',()=>{
  for(let n=0;n<3;n++){
    const result=run('oggi',n);
    assert.equal(result.decisions.filter(x=>['colleghi','assemblea','offerta'].includes(x.scene)).length,3);
    assert.ok(result.seen.includes('stesso-evento'));
    assert.ok(result.seen.includes('due-sguardi'));
    assert.ok(result.seen.includes('confronto'));
    assert.ok(result.story.insight.includes('quartiere'));
  }
});
test('Il confronto di sguardi non trasforma le risposte di comprensione in scelte morali',()=>{
  const s=stories.oggi;
  const scene=s.scenes.find(x=>x.id==='due-sguardi');
  assert.equal(scene.interactive,'views');
  assert.deepEqual(scene.panels.map(x=>x.id),['insieme','vicino']);
  assert.notEqual(scene.panels[0].text,scene.panels[1].text);
  assert.equal(s.scenes.find(x=>x.id==='confronto').choices.filter(c=>c.correct).length,1);
  for(const v of s.scenes.filter(x=>x.type==='decision')) {
    assert.equal(v.choices.length,3);
    for(const ch of v.choices) {
      assert.ok(Object.keys(ch.effects).some(k=>ch.effects[k]>0));
      assert.ok(Object.keys(ch.effects).some(k=>ch.effects[k]<0));
    }
  }
});
test('Il simulatore epico differenzia fatti del poema ed esperimenti',()=>{
  for(const id of ['ettore','achille','penelope']) {
    const story=stories[id];
    assert.ok(story.source.includes('Iliade')||story.source.includes('Odissea'));
    assert.ok(story.scenes.some(x=>x.historical===true));
    assert.ok(story.scenes.some(x=>x.type==='decision'));
  }
  assert.match(stories.penelope.scenes.find(x=>x.id==='regole-itaca').text,/inventate/);
  assert.match(stories.oggi.source,/originale/);
});
test('SVG moderni e omerici dedicati, con variabili che modificano la città',()=>{
  const a=art.markup('itaca',{casa:20,sostegno:12,tempo:19},'penelope');
  const b=art.markup('itaca',{casa:80,sostegno:90,tempo:76},'penelope');
  assert.notEqual(a,b);
  assert.match(a,/ATTESA 19/);
  assert.match(art.markup('tela',{},'penelope'),/<svg/);
  assert.match(art.markup('legami-itaca',{},'penelope',{role:'penelope'}),/data-view="penelope"/);
  for(const visual of ['fabbrica','quartiere','ragazza','autobus','due-sguardi']) {
    const image=art.markup(visual,{insieme:70},'oggi');
    assert.match(image,/<svg/);
    assert.ok(image.length>1000,visual);
    assert.doesNotMatch(image,/<image\\b|<foreignObject\\b/);
  }
  assert.match(art.markup('due-sguardi',{},'oggi',{role:'vicino'}),/data-view="vicino"/);
});