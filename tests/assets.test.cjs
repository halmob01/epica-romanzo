'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const drawings=require('../epica-map.js');
const stories=require('../storie.js');
const dir=path.join(__dirname,'..');

test('il disegno SVG non usa immagini esterne ed è pronto per i dispositivi mobili',()=>{
  const svg=drawings.markup('troia',{difesa:65,provviste:60,fiducia:60},'ettore');
  assert.match(svg,/<svg[\s\S]*<\/svg>/);
  assert.match(svg,/viewBox="0 0 480 270"/);
  assert.doesNotMatch(svg,/<image\b|<foreignObject\b|https?:\/\//);
});
test('le rappresentazioni delle risorse cambiano davvero con le scelte',()=>{
  const high=drawings.markup('troia',{difesa:80,provviste:85,fiducia:80});
  const low=drawings.markup('troia',{difesa:20,provviste:10,fiducia:20});
  assert.notEqual(high,low);
  assert.match(low,/stroke="#793e3e"/);
  const rich=drawings.markup('magazzino',{provviste:90});
  const poor=drawings.markup('magazzino',{provviste:10});
  assert.notEqual(rich,poor);
});
test('la pagina carica soltanto il motore e i contenuti nuovi, dopo il CSS condiviso',()=>{
  const html=fs.readFileSync(path.join(dir,'index.html'),'utf8');
  const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(scripts,['engine.js','storie.js','epica-map.js','epica-app.js']);
  for(const file of scripts) assert.ok(fs.existsSync(path.join(dir,file)),file);
  assert.match(html,/href="stile.css"/);
  assert.match(html,/href="epica.css"/);
  assert.ok(fs.existsSync(path.join(dir,'legacy/feudo/motore.js')));
});
test('il testo introduttivo distingue esplicitamente scelte inventate e fatti di Omero',()=>{
  const s=stories.ettore;
  assert.match(s.scenes[4].text,/inventate per il gioco/);
  assert.equal(s.scenes[5].type,'decision');
  assert.equal(s.scenes[8].historical,true);
  assert.equal(s.scenes[9].historical,true);
  assert.equal(s.scenes[10].historical,true);
});
test('la mappa non usa dati del feudo medievale',()=>{
  const script=fs.readFileSync(path.join(dir,'epica-map.js'),'utf8');
  for(const term of ['granaio','contadini','vassalli','castello']) assert.doesNotMatch(script,new RegExp(term,'i'));
});
