'use strict';
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const { chromium }=require('playwright-core');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'.artifacts','previews');
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{
  let pathname;
  try {pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch(_){res.writeHead(400);res.end();return;}
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep) && file!==root){res.writeHead(403);res.end();return;}
  const target=fs.existsSync(file)&&fs.statSync(file).isFile()?file:path.join(root,'index.html');
  const ext=path.extname(target);
  res.setHeader('Content-Type',ext==='.js'?'application/javascript; charset=utf-8':ext==='.css'?'text/css; charset=utf-8':'text/html; charset=utf-8');
  res.end(fs.readFileSync(target));
});
const click=(page,action)=>page.locator('[data-action="'+action+'"]:visible').last().click();
const choose=(page,id)=>page.locator('[data-choice="'+id+'"]').click();
const selectRole=(page,id)=>page.locator('[data-role="'+id+'"]').click();
async function next(page,n=1){for(let i=0;i<n;i++)await click(page,'next');}
async function assertFits(page,label){
  const sizes=await page.evaluate(()=>({full:document.documentElement.scrollWidth,viewport:innerWidth,card:document.querySelector('.pro-card')?.getBoundingClientRect().width}));
  assert.ok(sizes.full<=sizes.viewport+2,label+': horizontal overflow '+JSON.stringify(sizes));
  assert.ok(sizes.card===undefined||sizes.card<=sizes.viewport,label+': card beyond viewport');
}
async function start(page,id){
  await page.locator('[data-action="start"][data-story="'+id+'"]').click();
  assert.equal(await page.locator('#prologue').isVisible(),true);
}
async function shot(page,name){await page.screenshot({path:path.join(out,name+'.png'),fullPage:true});}
async function hector(page){
  await page.goto('http://127.0.0.1:4173/');
  await assertFits(page,'home');
  await shot(page,'01-home-mobile');
  await start(page,'ettore');
  await assertFits(page,'intro Ettore');
  await shot(page,'02-ettore-intro');
  await next(page,5);
  await assertFits(page,'scelta Ettore');
  await shot(page,'03-ettore-scelte');
  await choose(page,'famiglie');
  assert.match(await page.locator('#hud').innerText(),/41/);
  assert.match(await page.locator('#map').innerText(),/SCORTE 41/);
  await click(page,'next');
  await choose(page,'portone');await click(page,'next');
  await choose(page,'case');await click(page,'next');
  await next(page,3);
  assert.match(await page.locator('#prologue').innerText(),/Una persona, tre legami/);
  assert.equal(await page.locator('#prologue [data-action="next"]').isDisabled(),true);
  await selectRole(page,'marito');await selectRole(page,'padre');await selectRole(page,'difensore');
  assert.equal(await page.locator('#prologue [data-action="next"]').isEnabled(),true);
  await assertFits(page,'tre legami');
  await shot(page,'04-ettore-legami');
  await click(page,'next');await choose(page,'ruoli');await click(page,'next');await click(page,'next');
  assert.match(await page.locator('#panel').innerText(),/Le scelte che hai fatto/);
  await shot(page,'05-ettore-finale');
}
async function odyssey(page){
  await page.goto('http://127.0.0.1:4173/');
  await start(page,'penelope');
  await next(page,4);
  await choose(page,'fedeli');await click(page,'next');
  await choose(page,'partire');await click(page,'next');
  await next(page);
  assert.match(await page.locator('#prologue').innerText(),/Tre persone, una casa/);
  for(const id of ['penelope','telemaco','ulisse'])await selectRole(page,id);
  await assertFits(page,'tre vite Itaca');
  await shot(page,'06-itaca-tre-vite');
  await next(page);await choose(page,'ordine');await click(page,'next');await next(page);
  assert.match(await page.locator('#panel').innerText(),/Le scelte che hai fatto/);
}
async function achilles(page){
  await page.goto('http://127.0.0.1:4173/');
  await start(page,'achille');
  await next(page,2);
  await choose(page,'armatura');
  await click(page,'next');
  await next(page);
  await choose(page,'onore');
  await click(page,'next');
  await next(page);
  assert.match(await page.locator('#panel').innerText(),/Le scelte che hai fatto/);
  await shot(page,'10-achille-finale');
}
async function today(page){
  await page.goto('http://127.0.0.1:4173/');
  await start(page,'oggi');
  await next(page,4);
  await choose(page,'scuola');await click(page,'next');
  await choose(page,'partecipare');await click(page,'next');
  await choose(page,'provare');await click(page,'next');
  for(const id of ['nadia','madre','quartiere'])await selectRole(page,id);
  await next(page);
  await assertFits(page,'due sguardi');
  await selectRole(page,'insieme');await selectRole(page,'vicino');
  await shot(page,'07-oggi-due-sguardi');
  await next(page);await choose(page,'protagonista');await click(page,'next');
  await next(page,2);
  assert.match(await page.locator('#panel').innerText(),/chiusura della fabbrica/);
  await shot(page,'08-oggi-finale');
}
async function finalAssessment(page){
  await page.goto('http://127.0.0.1:4173/verifica.html');
  assert.match(await page.locator('#vf-intro').innerText(),/UNA VITA, MOLTI DESTINI/);
  await assertFits(page,'verifica intro');
  await shot(page,'12-verifica-intro');
  await page.locator('#vf-start').click();
  assert.match(await page.locator('#vf-question').innerText(),/Un gesto, molte conseguenze/);
  assert.equal(await page.locator('#vf-result').isVisible(),false,'nessun voto anticipato');
  // Riordinamento: nessuna soluzione esposta in UI, la prova conosce solo gli ID.
  const correct=['a','b','c','d'];
  for(let i=0;i<correct.length;i++){
    let cardIds=await page.locator('.vf-order-row [data-vf-move="-1"]').evaluateAll(nodes=>nodes.map(node=>node.dataset.vfCard));
    while(cardIds.indexOf(correct[i])>i){
      await page.locator('[data-vf-move="-1"][data-vf-card="'+correct[i]+'"]').click();
      cardIds=await page.locator('.vf-order-row [data-vf-move="-1"]').evaluateAll(nodes=>nodes.map(node=>node.dataset.vfCard));
    }
  }
  assert.equal(await page.locator('.vf-order-row').count(),4);
  await page.reload();
  assert.match(await page.locator('#vf-question').innerText(),/Un gesto, molte conseguenze/);
  await page.locator('[data-vf-action="next"]').click();
  await page.locator('[data-vf-match="achille"]').selectOption('greci');
  await page.locator('[data-vf-match="penelope"]').selectOption('itaca');
  await page.locator('[data-vf-match="ettore"]').selectOption('troia');
  await page.locator('[data-vf-action="next"]').click();
  await page.locator('[data-vf-choice="negozio"]').click();
  assert.equal(await page.locator('[data-vf-choice="negozio"]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-vf-choice="tirocinio"]').click();
  await page.locator('[data-vf-action="next"]').click();
  await page.locator('[data-vf-choice="soggetti"]').click();
  await page.locator('[data-vf-action="next"]').click();
  await page.locator('[data-vf-choice="intreccio"]').click();
  await page.locator('[data-vf-action="next"]').click();
  assert.match(await page.locator('#vf-question').innerText(),/La tua conclusione/);
  await assertFits(page,'verifica 390px');
  await shot(page,'13-verifica-scrittura');
  await page.locator('#vf-writing').fill('Ettore difende Troia e la sua famiglia. Marta risente della chiusura del ponte perché perde l’autobus.');
  assert.equal(await page.locator('#vf-result').isVisible(),false);
  await page.locator('[data-vf-action="finish"]').click();
  assert.match(await page.locator('.vf-score').innerText(),/100/);
  assert.match(await page.locator('#vf-result').innerText(),/non un voto scolastico/);
  assert.equal(await page.locator('.vf-feedback').count(),5);
  assert.match(await page.locator('#vf-result').innerText(),/Ettore difende Troia/);
  await shot(page,'14-verifica-risultato');
  await page.reload();
  assert.match(await page.locator('.vf-score').innerText(),/100/);
  await page.setViewportSize({width:320,height:700});
  await assertFits(page,'verifica risultati 320px');
  await page.locator('[data-vf-action="restart"]').click();
  assert.match(await page.locator('#vf-question').innerText(),/Un gesto, molte conseguenze/);
  await assertFits(page,'verifica prima domanda 320px');
  await shot(page,'15-verifica-320');
  await page.setViewportSize({width:390,height:844});
  // Verifica le posizioni effettivamente disegnate: non basta esaminare il sorgente.
  const positions=new Set();
  for(let seed=0;seed<12;seed++){
    await page.evaluate(seed=>{
      const key='epica-romanzo-verifica-finale-v1';
      const current=JSON.parse(localStorage.getItem(key));
      current.seed=seed;current.index=3;current.submitted=false;current.answers={};
      localStorage.setItem(key,JSON.stringify(current));
    },seed);
    await page.reload();
    const shown=await page.locator('.vf-option').evaluateAll(nodes=>nodes.map(n=>n.dataset.vfChoice));
    if(seed===0){
      await page.reload();
      const again=await page.locator('.vf-option').evaluateAll(nodes=>nodes.map(n=>n.dataset.vfChoice));
      assert.deepEqual(shown,again,'posizione stabile al nuovo render');
    }
    positions.add(shown.indexOf('soggetti'));
  }
  assert.ok(positions.size>=2,'la corretta non cambia posizione a video');
}
(async()=>{
  await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
  let browser;
  try{
    browser=await chromium.launch({executablePath:process.env.CHROME_BIN,headless:true,args:['--no-sandbox']});
    const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
    const errors=[];page.on('pageerror',err=>errors.push(err.message));
    await hector(page);await achilles(page);await odyssey(page);await today(page);await finalAssessment(page);
    assert.deepEqual(errors,[],'errori JavaScript dal browser');
    await page.setViewportSize({width:1280,height:800});
    await page.goto('http://127.0.0.1:4173/');
    await assertFits(page,'desktop');
    await shot(page,'09-home-desktop');
    await page.setViewportSize({width:320,height:700});
    await page.goto('http://127.0.0.1:4173/');
    await assertFits(page,'telefono stretto 320px');
    await start(page,'oggi');
    await assertFits(page,'card strette 320px');
    await shot(page,'11-telefono-stretto');
    console.log('Chromium smoke: 4 storie, verifica finale su 100, 320/390px e desktop, 15 anteprime.');
  } finally {if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});