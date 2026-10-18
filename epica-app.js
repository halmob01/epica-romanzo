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

  function save() {
    try { localStorage.setItem(STORAGE, JSON.stringify(session)); } catch (_) {}
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
    story = null; session = null; previewIndex = null;
    $('prologue').hidden = true;
    $('app').hidden = true;
    const saved=load();
    $('landing').hidden = false;
    $('continue').hidden = !saved;
    if(saved) $('continue').textContent='Continua: ' + saved.story.title;
    window.scrollTo?.(0,0);
  }

  function begin(id) {
    if (!Object.prototype.hasOwnProperty.call(stories,id)) return;
    story=engine.validateStory(stories[id]);
    session=engine.newSession(story);
    previewIndex=null;
    save();
    render();
  }

  function resume() {
    const saved=load();
    if(!saved) return showLanding();
    story=saved.story;
    session=saved.session;
    previewIndex=null;
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
    $('map').innerHTML=art.markup(scene?.art || 'troia',session.values,story.id);
    $('hud').innerHTML=statusCard(story);
    $('chapterTag').textContent=story.title + ' · Simulazione';
    $('turnTag').textContent=`${session.index+1}/${story.scenes.length}`;
  }

  function renderDecision(scene) {
    return `<div class="eyebrow">Scelta immaginaria · esperimento</div>
      <h1>${esc(scene.title)}</h1>
      <p class="ep-lead">${esc(scene.text)}</p>
      <div class="ep-choices">${scene.choices.map((ch,i)=>`<button class="opt ep-choice" data-choice="${esc(ch.id)}">
        <span class="k">${String.fromCharCode(65+i)}</span><span>${esc(ch.label)}</span></button>`).join('')}</div>
      <div class="ep-help">Non esiste una scelta che protegga tutto. Osserva chi beneficia della decisione e chi ne subisce il costo.</div>
      ${story.id==='ettore'?'<button class="btn ghost ep-small" data-action="replay">Rivedi la storia iniziale</button>':''}`;
  }

  function renderReflection(scene) {
    return `<div class="eyebrow">Comprensione · senza punteggio</div>
      <h1>${esc(scene.title)}</h1>
      <p class="ep-lead">${esc(scene.text)}</p>
      <div class="ep-choices">${scene.choices.map((ch,i)=>`<button class="opt ep-choice" data-choice="${esc(ch.id)}"><span class="k">${String.fromCharCode(65+i)}</span><span>${esc(ch.label)}</span></button>`).join('')}</div>`;
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
      <button class="btn" data-action="next">Continua →</button>`;
  }

  function renderEnd() {
    const summary=engine.recap(story,session);
    const choices=summary.decisions.filter(d=>d.changes.length>0).length;
    return `<div class="eyebrow">Conclusione · ${esc(story.title)}</div><h1>Una vita, un mondo</h1>
       <p class="ep-lead">${esc(summary.insight)}</p>
       <h3>La tua simulazione</h3>
       <p>Hai compiuto ${summary.decisions.length} scelte, di cui ${choices} hanno modificato le misure. I numeri descrivono <b>questa simulazione</b>, non il destino storico di Troia.</p>
       <div class="ep-change-list">${summary.values.map(x=>`<div class="ep-change"><span>${esc(x.label)}</span><b>${x.before} → ${x.after}</b></div>`).join('')}</div>
       <div class="note"><b>Domanda da portare in classe</b><p>Un gesto che sembra personale può rappresentare il destino di una comunità? Spiega usando una scena.</p></div>
       <div class="row"><button class="btn" data-action="restart">Rigioca</button><button class="btn ghost" data-action="menu">Altre storie</button></div>`;
  }

  function renderPrologue() {
    const isPreview=previewIndex!==null;
    const index=isPreview?previewIndex:session.index;
    const scene=story.scenes[index];
    const nextScene=story.scenes[index+1];
    const canSkip=!isPreview && story.id==='ettore' && index<5;
    const endPreview=isPreview && index>=4;
    const label=isPreview?'Ripasso':scene.historical?'Racconto dell’Iliade':'Card introduttiva';
    $('prologue').hidden=false;
    $('prologue').innerHTML=`<div class="pro-card">
      <div class="pro-art pro-in">${art.markup(scene.art,session.values,story.id)}</div>
      <div class="pro-body">
        <div class="pro-top"><div class="eyebrow">${esc(label)} · ${index+1}/${story.scenes.length}</div><button class="pill" data-action="menu">Esci</button></div>
        <h2 class="pro-title">${esc(scene.title)}</h2>
        <p class="pro-text">${esc(scene.text)}</p>
        <div class="pro-dots">${story.scenes.map((_,i)=>`<i class="${i<index?'done':i===index?'now':''}"></i>`).join('')}</div>
        <div class="row"><button class="btn" data-action="${isPreview?(endPreview?'close-preview':'preview-next'):'next'}">${isPreview&&endPreview?'Torna alla scelta':'Avanti →'}</button>
          ${canSkip?'<button class="btn ghost" data-action="skip">Salta il prologo</button>':''}
          ${isPreview?'<button class="btn ghost" data-action="close-preview">Chiudi il ripasso</button>':''}
        </div>
      </div></div>`;
    const button=$('prologue').querySelector('.btn');
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
    if(!(!$('prologue').hidden)) window.scrollTo?.(0,0);
  }

  function next() {
    if(!session) return;
    try { session=engine.advance(story,session);save();render(); }
    catch (error) { console.warn(error); }
  }
  function skip() {
    if(!session || session.phase!=='scene'|| story.id!=='ettore'||session.index>=5) return;
    while(session.index<5 && session.phase==='scene' && engine.currentScene(story,session).type==='narrative'){
      session=engine.advance(story,session);
    }
    save();render();
  }

  document.addEventListener('click',event=>{
    const choice=event.target.closest('[data-choice]');
    if(choice && story && session && session.phase==='scene' && previewIndex===null) {
      try {session=engine.select(story,session,choice.dataset.choice);save();render();} catch(error){console.warn(error);} return;
    }
    const b=event.target.closest('[data-action]');
    if(!b)return;
    switch(b.dataset.action){
      case 'start':begin(b.dataset.story);break;
      case 'continue':resume();break;
      case 'next':next();break;
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
