/* Collegamento browser al motore puro. Nessuna regola delle storie in questo file. */
(function () {
  'use strict';
  const engine = window.EpicaEngine;
  const stories = window.EpicaStories;
  const art = window.EpicaMap;
  const STORAGE = 'epica-romanzo-session-v1';
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let story = null;
  let session = null;
  let previewIndex = null;
  let roleSelection = null;
  let roleSeen = new Set();
  let history = [];
  const HISTORY_STORAGE = 'epica-romanzo-history-v1';
  function remember() {
    if (!session || previewIndex!==null) return;
    history.push({session:JSON.parse(JSON.stringify(session)),roleSelection,roleSeen:[...roleSeen]});
    if(history.length>80)history.shift();
  }
  function back() {
    if(previewIndex!==null){previewIndex=Math.max(0,previewIndex-1);render();return;}
    if(!history.length)return;
    const prior=history.pop();
    session=engine.restore(story,prior.session);
    if(!session)return;
    roleSelection=prior.roleSelection;
    roleSeen=new Set(prior.roleSeen);
    save();render();
  }
  function panelsFor(scene) { return scene.panels || []; }
  function rolePanel(scene) {
    const panels=panelsFor(scene);
    const chosen=panels.find(x=>x.id===roleSelection);
    return '<div class="ep-roles" aria-label="Esplora i punti di vista">' +
      panels.map(x=>'<button type="button" class="ep-role '+(x.id===roleSelection?'selected':'')+'" data-role="'+esc(x.id)+'" aria-pressed="'+(x.id===roleSelection)+'">' +
      '<strong>'+esc(x.label||x.title)+'</strong><small>'+esc(x.name)+'</small>' +
      (roleSeen.has(x.id)?'<span class="ep-visited" aria-label="esplorato">✓</span>':'')+'</button>').join('') +
      '</div><div class="ep-role-explanation" role="status">'+
      (chosen?'<strong>'+esc(chosen.name)+'</strong>'+((scene.id==='distinzioni'&&chosen.text.includes(' VITE PARTICOLARI:'))?'<div class="ep-compare">'+chosen.text.split(' VITE PARTICOLARI:').map((part,i)=>'<div class="ep-compare-side"><span class="ep-compare-label">'+(i===0?'EPICA':'VITE PARTICOLARI')+'</span><p>'+esc(i===0?part.replace(/^EPICA:\\s*/,''):part)+'</p></div>').join('')+'</div>':'<p>'+esc(chosen.text)+'</p>'):'<p>Seleziona le diverse prospettive e scopri che cosa cambia.</p>')+
      '</div><p class="ep-roles-progress">'+roleSeen.size+'/'+panels.length+' '+(scene.interactive==='roles'?'legami esplorati. ':'prospettive esplorate. ')+(roleSeen.size===panels.length?'Ora puoi proseguire.':'Esplorale tutte per continuare.')+'</p>';
  }

  function save() {
    try { localStorage.setItem(STORAGE, JSON.stringify(session)); localStorage.setItem(HISTORY_STORAGE,JSON.stringify({storyId:story?.id,history})); } catch (_) {}
  }
  function load() {
    try {
      const raw=localStorage.getItem(STORAGE);
      if (!raw) return null;
      const data=JSON.parse(raw);
      if (!data || typeof data.storyId !== 'string' || !Object.prototype.hasOwnProperty.call(stories,data.storyId)) return null;
      const restored=engine.restore(stories[data.storyId], data);
      return restored ? {story:stories[data.storyId],session:restored} : null;
    } catch (_) { return null; }
  }

  function setProgress(index, total) {
    $('progress').innerHTML = Array.from({length:total},(_,i)=>`<i class="${i<index?'done':i===index?'now':''}"></i>`).join('');
  }

  function showLanding() {
    story = null; session = null; previewIndex = null; roleSelection = null; roleSeen = new Set();
    $('prologue').hidden = true;
    $('app').hidden = true;
    const saved=load();
    $('landing').hidden = false;
    document.querySelectorAll('[data-cover]').forEach(el => {
      const id = el.dataset.cover;
      el.innerHTML = art.markup(stories[id]?.coverArt || (id==='achille'?'scelta':'troia'), {}, id);
    });
    $('continue').hidden = !saved;
    if(saved) $('continue').textContent='Continua: ' + saved.story.title;
    window.scrollTo?.(0,0);
  }

  function begin(id) {
    if (!Object.prototype.hasOwnProperty.call(stories,id)) return;
    story=engine.validateStory(stories[id]);
    session=engine.newSession(story);
    history=[];
    previewIndex=null; roleSelection=null; roleSeen=new Set();
    save();
    render();
  }

  function resume() {
    const saved=load();
    if(!saved) return showLanding();
    story=saved.story;
    session=saved.session;
    try {const h=JSON.parse(localStorage.getItem(HISTORY_STORAGE));history=h?.storyId===story.id&&Array.isArray(h.history)?h.history.filter(x=>x&&x.session&&x.session.storyId===story.id).slice(-80):[];}catch(_){history=[];}
    previewIndex=null; roleSelection=null; roleSeen=new Set();
    render();
  }

  function statusCard(s) {
    const changed = session.phase==='outcome' && session.last
      ? Object.fromEntries(session.last.changes.map(c=>[c.id,c.delta])) : {};
    return s.stats.map(stat=>{
      const value=session.values[stat.id], delta=changed[stat.id] || 0;
      return `<div class="ep-stat">
        <div class="ep-stat-head"><span>${esc(stat.label)}</span><span><b>${value}</b> / 100 ${delta?`<em class="${delta<0?'ep-down':'ep-up'}">${delta>0?'+':''}${delta}</em>`:''}</span></div>
        <div class="ep-meter"><div style="width:${value}%"></div></div>
      </div>`;
    }).join('');
  }

  function storyMap() {
    const scene=engine.currentScene(story, session);
    // La mappa del simulatore resta sempre Troia: varia con le scelte anche se la card illustra un magazzino o le mura.
    $('map').innerHTML=art.markup(story.id==='ettore'?'troia':story.id==='penelope'?'itaca':(scene?.art || 'scelta'),session.values,story.id);
    $('hud').innerHTML=statusCard(story);
    const kind=scene?.type==='decision'?'Scelta ipotetica':scene?.historical?'Racconto di Omero':'Riflessione';
    $('chapterTag').textContent=story.title + ' · ' + kind;
    $('turnTag').textContent=`${session.index+1}/${story.scenes.length}`;
  }

  function renderDecision(scene) {
    return `<div class="eyebrow">Scelta immaginaria · esperimento</div>
      <h1>${esc(scene.title)}</h1>
      <p class="ep-lead">${esc(scene.text)}</p>
      <div class="ep-choices">${scene.choices.map((ch,i)=>`<button class="opt ep-choice" data-choice="${esc(ch.id)}">
        <span class="k">${String.fromCharCode(65+i)}</span><span>${esc(ch.label)}</span></button>`).join('')}</div>
      <div class="ep-help">Non esiste una scelta che protegga tutto. Osserva chi beneficia della decisione e chi ne subisce il costo.</div>
      <div class="row">${history.length?'<button class="btn ghost ep-small" data-action="back">← Indietro</button>':''}${story.id==='ettore'?'<button class="btn ghost ep-small" data-action="replay">Rivedi la storia iniziale</button>':''}</div>`;
  }

  function renderReflection(scene) {
    return `<div class="eyebrow">Comprensione · senza punteggio</div>
      <h1>${esc(scene.title)}</h1>
      <p class="ep-lead">${esc(scene.text)}</p>
      <div class="ep-choices">${scene.choices.map((ch,i)=>`<button class="opt ep-choice" data-choice="${esc(ch.id)}"><span class="k">${String.fromCharCode(65+i)}</span><span>${esc(ch.label)}</span></button>`).join('')}</div>${history.length?'<button class="btn ghost ep-small" data-action="back">← Indietro</button>':''}`;
  }

  function renderOutcome() {
    const last=session.last;
    const scene=story.scenes[session.index];
    const isReflection=scene.type==='reflection';
    return `<div class="eyebrow">${isReflection?'Ragioniamo':'Conseguenza della scelta'}</div>
      <h1>${isReflection?'Che cosa hai scoperto?':'Ogni scelta ha un costo'}</h1>
      <p class="ep-lead">${esc(last.feedback)}</p>
      ${last.changes.length?`<div class="ep-change-list">${last.changes.map(ch=>`<div class="ep-change"><span>${esc(ch.label)}</span><b class="${ch.delta>0?'ep-up':'ep-down'}">${ch.delta>0?'+':''}${ch.delta}</b></div>`).join('')}</div>`:''}
      ${last.afterText?`<p class="ep-after">${esc(last.afterText)}</p>`:''}
      <div class="note"><b>Perché conta</b><p>${esc(last.why)}</p></div>
      <div class="row"><button class="btn ghost" data-action="back">← Indietro</button><button class="btn" data-action="next">Continua →</button></div>`;
  }

  function renderEnd() {
    const summary=engine.recap(story,session);
    const episodes=summary.decisions.filter(d=>story.scenes.find(s=>s.id===d.sceneId)?.type==='decision');
    const episodesHTML=episodes.map(d=>{
      const scene=story.scenes.find(s=>s.id===d.sceneId);
      const choice=scene?.choices.find(c=>c.id===d.choiceId);
      const positive=d.changes.filter(x=>x.delta>0).map(x=>x.label+' +'+x.delta).join(', ');
      const negative=d.changes.filter(x=>x.delta<0).map(x=>x.label+' '+x.delta).join(', ');
      return '<div class="ep-episode"><strong>'+esc(scene.title)+'</strong>' +
        '<span>Hai scelto: '+esc(choice?.label||'')+'</span>' +
        (positive?'<small class="ep-up">Hai favorito: '+esc(positive)+'</small>':'')+
        (negative?'<small class="ep-down">Il costo: '+esc(negative)+'</small>':'')+
        '<small>'+esc(choice?.why||'')+'</small></div>';
    }).join('');
    return '<div class="eyebrow">Conclusione · '+esc(story.title)+'</div>'+
      '<h1>Una vita, un mondo</h1>'+
      '<p class="ep-lead">'+esc(summary.insight)+'</p>'+
      '<h3>Le scelte che hai fatto</h3>'+
      '<div class="ep-episode-list">'+episodesHTML+'</div>'+
      '<h3>Le misure finali</h3>'+
      '<p>'+esc(story.id==='oggi'?'Questi numeri rappresentano solo la simulazione: non sono un voto e non descrivono dati reali.':'Questi numeri descrivono solo la simulazione. Non sono un voto e non cambiano il racconto di Omero.')+'</p>'+
      '<div class="ep-change-list">'+summary.values.map(x=>'<div class="ep-change"><span>'+esc(x.label)+'</span><b>'+x.before+' → '+x.after+'</b></div>').join('')+'</div>'+
      '<div class="note"><b>La domanda da ricordare</b><p>'+esc(story.question || (story.id==='ettore'?'Perché una decisione di Ettore riguarda anche Andromaca, Astianatte e gli abitanti di Troia?':'Perché una decisione di Achille riguarda anche tutti gli altri Greci?'))+'</p></div>'+
      '<div class="row"><button class="btn ghost" data-action="back">← Indietro</button><button class="btn" data-action="restart">Rigioca</button><button class="btn ghost" data-action="menu">Altre storie</button>'+ (story.id==='oggi'?'<a class="btn" href="./verifica.html">Attività finale →</a>':'') +'</div>';
  }

  function renderPrologue() {
    const isPreview=previewIndex!==null;
    const index=isPreview?previewIndex:session.index;
    const scene=story.scenes[index];
    const canSkip=!isPreview && story.id==='ettore' && index<5;
    const endPreview=isPreview && index>=4;
    const isRoleScene = !isPreview && (scene.interactive === 'roles' || scene.interactive === 'views');
    const panelsCount = isRoleScene ? panelsFor(scene).length : 0;
    const label=isPreview?'Ripasso':isRoleScene?'Esplora i legami':scene.historical?(story.id==='penelope'?'Racconto dell’Odissea':'Racconto dell’Iliade'):(story.id==='oggi'?'Una storia di oggi':'Card introduttiva');
    $('prologue').hidden=false;
    $('prologue').innerHTML=`<div class="pro-card">
      <div class="pro-art pro-in">${art.markup(scene.art,session.values,story.id,{role:isRoleScene?roleSelection:null})}</div>
      <div class="pro-body">
        <div class="pro-top"><div class="eyebrow">${esc(label)} · ${index+1}/${story.scenes.length}</div><button class="pill" data-action="menu">Esci</button></div>
        <h2 class="pro-title">${esc(scene.title)}</h2>
        <p class="pro-text">${esc(scene.text)}</p>
        ${isRoleScene?rolePanel(scene):''}
        <div class="pro-dots">${story.scenes.map((_,i)=>`<i class="${i<index?'done':i===index?'now':''}"></i>`).join('')}</div>
        <div class="row">${(isPreview?previewIndex>0:history.length>0)?'<button class="btn ghost" data-action="back">← Indietro</button>':''}<button class="btn" data-action="${isPreview?(endPreview?'close-preview':'preview-next'):'next'}" ${isRoleScene && roleSeen.size<panelsCount?'disabled aria-disabled="true"':''}>${isPreview&&endPreview?'Torna alla scelta':'Avanti →'}</button>
          ${canSkip?'<button class="btn ghost" data-action="skip">Salta il prologo</button>':''}
          ${isPreview?'<button class="btn ghost" data-action="close-preview">Chiudi il ripasso</button>':''}
        </div>
      </div></div>`;
    const button=$('prologue').querySelector(isRoleScene?'.ep-role':'.btn');
    button?.focus({preventScroll:true});
  }

  function render() {
    if(!story || !session) return showLanding();
    $('landing').hidden=true;
    $('app').hidden=false;
    $('headline').textContent=story.subtitle;
    $('storyName').textContent=story.title;
    setProgress(session.index,story.scenes.length);
    storyMap();
    if(session.phase==='end'){
      $('prologue').hidden=true;
      $('panel').innerHTML=renderEnd();
    } else if(previewIndex!==null || (session.phase==='scene' && engine.currentScene(story,session).type==='narrative')) {
      $('panel').innerHTML='<p>Segui il racconto sulle card illustrate.</p>';
      renderPrologue();
    } else {
      $('prologue').hidden=true;
      const scene=engine.currentScene(story,session);
      $('panel').innerHTML=session.phase==='outcome'?renderOutcome():scene.type==='reflection'?renderReflection(scene):renderDecision(scene);
      $('panel').setAttribute('aria-live','polite');
    }
    if ($('prologue').hidden) window.scrollTo?.(0,0);
  }

  function next() {
    if(!session || previewIndex !== null) return;
    const current=engine.currentScene(story,session);
    if (['roles','views'].includes(current?.interactive) && roleSeen.size < panelsFor(current).length) return;
    try { remember();session=engine.advance(story,session);roleSelection=null;roleSeen=new Set();save();render(); }
    catch (error) { console.warn(error); }
  }
  function skip() {
    if(!session || session.phase!=='scene'|| story.id!=='ettore'||session.index>=5) return;
    remember();
    while(session.index<5 && session.phase==='scene' && engine.currentScene(story,session).type==='narrative'){
      session=engine.advance(story,session);
    }
    save();render();
  }

  document.addEventListener('click',event=>{
    const role=event.target.closest('[data-role]');
    if(role && story && session && session.phase==='scene' && previewIndex===null &&
        ['roles','views'].includes(engine.currentScene(story,session)?.interactive) &&
        panelsFor(engine.currentScene(story,session)).some(x=>x.id===role.dataset.role)) {
      roleSelection=role.dataset.role;
      roleSeen.add(roleSelection);
      renderPrologue();
      $('prologue').querySelector('[data-role="'+roleSelection+'"]')?.focus({preventScroll:true});
      return;
    }
    const choice=event.target.closest('[data-choice]');
    if(choice && story && session && session.phase==='scene' && previewIndex===null) {
      try {remember();session=engine.select(story,session,choice.dataset.choice);save();render();} catch(error){console.warn(error);} return;
    }
    const b=event.target.closest('[data-action]');
    if(!b)return;
    switch(b.dataset.action){
      case 'start':begin(b.dataset.story);break;
      case 'continue':resume();break;
      case 'next':next();break;
      case 'back':back();break;
      case 'skip':skip();break;
      case 'menu':showLanding();break;
      case 'restart':begin(story.id);break;
      case 'replay':previewIndex=0;render();break;
      case 'preview-next':previewIndex=Math.min(4,previewIndex+1);render();break;
      case 'close-preview':previewIndex=null;render();break;
    }
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='ArrowRight' && !$('prologue').hidden && !event.repeat && !event.altKey && !event.ctrlKey && !event.metaKey){
      if(previewIndex!==null){previewIndex=previewIndex>=4?null:previewIndex+1;render();}
      else next();
    }
  });
  showLanding();
})();
