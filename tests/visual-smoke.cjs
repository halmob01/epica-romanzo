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
(async()=>{
  await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
  let browser;
  try{
    browser=await chromium.launch({executablePath:process.env.CHROME_BIN,headless:true,args:['--no-sandbox']});
    const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
    const errors=[];page.on('pageerror',err=>errors.push(err.message));
    await hector(page);await odyssey(page);await today(page);
    assert.deepEqual(errors,[],'errori JavaScript dal browser');
    await page.setViewportSize({width:1280,height:800});
    await page.goto('http://127.0.0.1:4173/');
    await assertFits(page,'desktop');
    await shot(page,'09-home-desktop');
    console.log('Chromium smoke: 3 storie complete, mobile e desktop, 9 anteprime.');
  } finally {if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});