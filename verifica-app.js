/* Interfaccia della verifica finale. Il motore di punteggio è solo in finale.js. */
(function(){
  'use strict';
  const quiz=window.EpicaFinale;
  const STORE='epica-romanzo-verifica-finale-v1';
  const $=id=>document.getElementById(id);
  const esc=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const questionById=id=>quiz.QUESTIONS.find(q=>q.id===id);
  let state=null;
  function save(){
    try{localStorage.setItem(STORE,JSON.stringify(state));}catch(_){}
  }
  function load(){
    try{return quiz.restore(localStorage.getItem(STORE));}catch(_){return null;}
  }
  function setMessage(text){
    $('vf-hint').textContent=text;
  }
  function freshSession(){
    state=quiz.fresh(Math.floor(Math.random()*2147483647));
    save();
  }
  function start(){
    state=load();
    if(!state)freshSession();
    render();
    window.scrollTo?.(0,0);
  }
  function nav(index){
    if(!state||state.submitted)return;
    state=quiz.restore({...state,index:Math.max(0,Math.min(quiz.QUESTIONS.length-1,index))});
    save();
    render();
    window.scrollTo?.(0,0);
  }
  function choose(id){
    if(!state||state.submitted)return;
    const q=quiz.QUESTIONS[state.index];
    if(q.type==='writing'||q.type==='order')return;
    const old=state.answers[q.id];
    if(q.type==='choice')state=quiz.answer(state,q.id,id);
    else if(q.type==='multi'){
      const selected=Array.isArray(old)?old:[];
      if(selected.includes(id))state=quiz.answer(state,q.id,selected.filter(v=>v!==id));
      else if(selected.length<2)state=quiz.answer(state,q.id,selected.concat(id));
      else {setMessage('Puoi scegliere due risposte. Deselezionane una per cambiare.');return;}
    }
    save();
    render();
  }
  function match(id,target){
    if(!state||state.submitted)return;
    const q=quiz.QUESTIONS[state.index];
    if(q.type!=='match')return;
    const old=state.answers[q.id]||{};
    const updated={...old,[id]:target};
    state=quiz.answer(state,q.id,updated);
    save();
    render();
    const field=document.querySelector('[data-vf-match="'+id+'"]');
    field?.focus({preventScroll:true});
  }
  function moveCard(id,direction){
    if(!state||state.submitted)return;
    const q=quiz.QUESTIONS[state.index];
    if(q.type!=='order')return;
    const order=state.answers[q.id].slice();
    const index=order.indexOf(id),next=index+direction;
    if(index<0||next<0||next>=order.length)return;
    [order[index],order[next]]=[order[next],order[index]];
    state=quiz.answer(state,q.id,order);
    save();render();
    document.querySelector('[data-vf-move="'+direction+'"][data-vf-card="'+id+'"]')?.focus({preventScroll:true});
  }
  function renderOrder(q){
    const order=state.answers[q.id]||quiz.ordered(q,state.seed).map(c=>c.id);
    return '<p class="vf-task-note">Usa le frecce per ordinare i quattro avvenimenti, dal primo all’ultimo.</p>'+
      '<div class="vf-order">'+order.map((id,i)=>{
        const card=q.cards.find(c=>c.id===id);
        return '<div class="vf-order-row"><strong class="vf-order-n">'+(i+1)+'</strong><span>'+esc(card.text)+'</span>'+
          '<div class="vf-order-controls"><button type="button" class="vf-mini" data-vf-move="-1" data-vf-card="'+esc(id)+'" aria-label="Sposta su: '+esc(card.text)+'" '+(i===0?'disabled':'')+'>↑</button>'+
          '<button type="button" class="vf-mini" data-vf-move="1" data-vf-card="'+esc(id)+'" aria-label="Sposta giù: '+esc(card.text)+'" '+(i===order.length-1?'disabled':'')+'>↓</button></div></div>';
      }).join('')+'</div>';
  }
  function renderMatch(q){
    const values=state.answers[q.id]||{};
    return '<p class="vf-task-note">Per ogni personaggio scegli l’elemento collettivo corrispondente.</p>'+
      '<div class="vf-matches">'+q.pairs.map(p=>'<label class="vf-match-row"><strong>'+esc(p.label)+'</strong>'+
        '<select data-vf-match="'+esc(p.id)+'"><option value="">Seleziona il collegamento</option>'+
        quiz.ordered(q,state.seed).map(t=>'<option value="'+esc(t.id)+'" '+(values[p.id]===t.id?'selected':'')+'>'+esc(t.text)+'</option>').join('')+
        '</select></label>').join('')+'</div>';
  }
  function renderChoice(q){
    const selected=state.answers[q.id]|| (q.type==='multi'?[]:'');
    return '<div class="vf-options" role="group" aria-label="Scegli le risposte">'+quiz.ordered(q,state.seed).map((o,i)=>{
      const checked=q.type==='multi'?selected.includes(o.id):selected===o.id;
      return '<button type="button" class="vf-option'+(checked?' vf-option-selected':'')+'" data-vf-choice="'+esc(o.id)+'" aria-pressed="'+checked+'">'+
       '<span class="vf-opt-marker">'+(checked?'✓':String.fromCharCode(65+i))+'</span><span>'+esc(o.text)+'</span></button>';
    }).join('')+'</div>';
  }
  function renderWriting(q){
    return '<p class="vf-task-note">'+esc(q.hint)+'</p>'+
      '<label class="vf-writing-label" for="vf-writing">La tua riflessione (facoltativa)</label>'+
      '<textarea id="vf-writing" class="vf-writing" rows="5" maxlength="1600" placeholder="Scrivi qui le tue due frasi, oppure svolgi l’esercizio sul quaderno.">'+esc(state.writing)+'</textarea>'+
      '<p class="vf-small">Questa parte non viene corretta dal computer e non modifica i punti degli esercizi precedenti.</p>';
  }
  function renderQuestion(){
    const q=quiz.QUESTIONS[state.index];
    const total=quiz.QUESTIONS.length;
    $('vf-counter').textContent='Attività '+(state.index+1)+' di '+total;
    $('vf-point-label').textContent=q.points?q.points+' punti':'Riflessione libera';
    $('vf-progress').innerHTML=quiz.QUESTIONS.map((_,i)=>'<i class="'+(i<state.index?'done':i===state.index?'now':'')+'"></i>').join('');
    $('vf-question').innerHTML='<div class="ep-kicker">Comprensione e trasferimento</div>'+
      '<h2>'+esc(q.title)+'</h2>'+
      (q.passageA?'<div class="vf-passages"><blockquote>'+esc(q.passageA)+'</blockquote><blockquote>'+esc(q.passageB)+'</blockquote></div>':'')+
      '<p class="vf-prompt">'+esc(q.prompt)+'</p>'+
      (q.type==='order'?renderOrder(q):q.type==='match'?renderMatch(q):q.type==='writing'?renderWriting(q):renderChoice(q));
    $('vf-prev').disabled=state.index===0;
    $('vf-next').hidden=state.index===total-1;
    $('vf-finish').hidden=state.index!==total-1;
    setMessage(state.index===total-1?'Consegna solo quando hai completato i cinque esercizi. La riflessione scritta è facoltativa.':'Puoi cambiare le risposte. La correzione arriva soltanto alla consegna.');
  }
  function explanation(q,a){
    if(q.type==='order')return q.answer.map(id=>q.cards.find(x=>x.id===id).text).join(' → ');
    if(q.type==='match')return q.pairs.map(p=>p.label+' → '+q.targets.find(t=>t.id===q.answer[p.id]).text).join(' · ');
    if(q.type==='multi')return q.answer.map(id=>q.options.find(o=>o.id===id).text).join(' · ');
    if(q.type==='choice')return q.options.find(o=>o.id===q.answer).text;
    return '';
  }
  function renderResults(){
    const result=quiz.evaluate(state);
    $('vf-result').innerHTML='<div class="ep-kicker">Conclusione · la tua prova</div><h1>UNA VITA, MOLTI DESTINI</h1>'+
      '<div class="vf-score"><strong>'+result.score+'</strong><span>/ 100 punti</span></div>'+
      '<p class="vf-result-context">Questo è il punteggio dei cinque esercizi autocorretti, non un voto scolastico. La tua riflessione scritta non è stata valutata automaticamente.</p>'+
      '<h2>Ripercorri le domande</h2><div class="vf-feedback-list">'+result.results.map(r=>{
        const q=questionById(r.id);
        return '<details class="vf-feedback"><summary><strong>'+esc(q.title)+'</strong><span>'+Math.round(r.earned*10)/10+' / '+r.total+'</span></summary>'+
          '<div class="vf-feedback-body"><p>'+esc(r.why)+'</p><p><b>Soluzione:</b> '+esc(explanation(q,state.answers[q.id]))+'</p></div></details>';
      }).join('')+'</div>'+
      '<section class="vf-personal-writing"><h2>La tua conclusione</h2>'+
      (state.writing.trim()?'<p class="vf-written">'+esc(state.writing)+'</p>':
        '<p>Puoi completare la riflessione sul quaderno: spiega come Ettore e Marta siano coinvolti in destini che riguardano anche altre persone.</p>')+
      '<p class="vf-small">Chiedi al docente un riscontro sulla precisione dei collegamenti e sulla chiarezza delle due frasi. Il punteggio automatico non misura questa competenza.</p></section>'+
      '<div class="vf-final-actions"><button type="button" class="btn" data-vf-action="restart">Riprova una nuova versione</button>'+
      '<a class="btn ghost" href="./index.html">Torna alle storie</a></div>';
    $('vf-intro').hidden=true;
    $('vf-assessment').hidden=true;
    $('vf-result').hidden=false;
  }
  function render(){
    if(!state){$('vf-intro').hidden=false;$('vf-assessment').hidden=true;$('vf-result').hidden=true;return;}
    if(state.submitted)return renderResults();
    $('vf-intro').hidden=true;
    $('vf-result').hidden=true;
    $('vf-assessment').hidden=false;
    renderQuestion();
  }
  function finish(){
    if(!state||state.submitted)return;
    const missing=quiz.AUTOCORRECT.find(q=>!quiz.answered(q,state.answers[q.id]));
    if(missing){
      nav(quiz.QUESTIONS.indexOf(missing));
      setMessage('Completa questa attività prima di consegnare. Non servono risposte scritte obbligatorie.');
      return;
    }
    state=quiz.submit(state);
    save();
    render();
    window.scrollTo?.(0,0);
  }
  $('vf-start').addEventListener('click',start);
  document.addEventListener('click',event=>{
    const choice=event.target.closest('[data-vf-choice]');
    if(choice){choose(choice.dataset.vfChoice);return;}
    const card=event.target.closest('[data-vf-move]');
    if(card){moveCard(card.dataset.vfCard,Number(card.dataset.vfMove));return;}
    const action=event.target.closest('[data-vf-action]');
    if(!action)return;
    switch(action.dataset.vfAction){
      case 'prev':nav(state.index-1);break;
      case 'next':nav(state.index+1);break;
      case 'finish':finish();break;
      case 'restart':freshSession();render();window.scrollTo?.(0,0);break;
    }
  });
  document.addEventListener('change',event=>{
    if(event.target.matches('[data-vf-match]'))match(event.target.dataset.vfMatch,event.target.value);
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='vf-writing'&&state&&!state.submitted){state=quiz.write(state,event.target.value);save();}
  });
  const restored=load();
  if(restored){state=restored;render();}
  else render();
})();