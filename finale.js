/* Attività conclusiva "Una vita, molti destini" — contenuti e correzione.
   Non modifica il motore delle simulazioni. Nessuna dipendenza dal DOM.
   Il risultato è SOLO della parte autocorretta, non un voto scolastico. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.EpicaFinale=api;
})(typeof globalThis==='object'?globalThis:this,function(){
  'use strict';
  const VERSION=1;
  const QUESTIONS=Object.freeze([
    {
      id:'catena',type:'order',objective:'Ricostruire un rapporto causa-scelta-conseguenze',points:20,
      title:'Un gesto, molte conseguenze',
      source:'Trasferimento: episodio inventato a partire dal nesso individuo/comunità',
      prompt:'Una piena minaccia un villaggio. Rimetti in ordine gli avvenimenti: quale fatto mette in moto il successivo?',
      cards:[
        {id:'a',text:'Il fiume sale e minaccia il ponte.'},
        {id:'b',text:'La guardiana decide di chiudere il passaggio.'},
        {id:'c',text:'I mercanti non riescono a raggiungere il mercato.'},
        {id:'d',text:'Gli abitanti cercano insieme un’altra strada.'}
      ],
      answer:['a','b','c','d'],
      why:'La minaccia provoca una scelta personale; da quella scelta nascono conseguenze per gli scambi e per gli abitanti.'
    },
    {
      id:'legami',type:'match',objective:'Collegare la vicenda personale a un ruolo collettivo',points:20,
      title:'Di chi è in gioco il destino?',
      source:'Richiamo con nuova formulazione di Iliade e Odissea',
      prompt:'Associa a ciascun personaggio ciò che è coinvolto nella sua vicenda.',
      pairs:[
        {id:'ettore',label:'Ettore'},
        {id:'achille',label:'Achille'},
        {id:'penelope',label:'Penelope'}
      ],
      targets:[
        {id:'troia',text:'La sicurezza della città e delle famiglie'},
        {id:'greci',text:'La tenuta dei compagni di battaglia'},
        {id:'itaca',text:'La continuità della casa e del regno'}
      ],
      answer:{ettore:'troia',achille:'greci',penelope:'itaca'},
      why:'Ettore difende Troia, l’onore di Achille coinvolge i Greci, Penelope resiste per la casa e per Itaca.'
    },
    {
      id:'effetti',type:'multi',objective:'Distinguere le conseguenze collettive da azioni e decisioni',points:20,
      title:'Un fatto pubblico entra nelle vite',
      source:'Trasferimento: chiusura del ponte, caso nuovo',
      prompt:'Un ponte viene chiuso per sicurezza. Seleziona le DUE frasi che descrivono una conseguenza per la vita delle persone.',
      options:[
        {id:'tirocinio',text:'Un apprendista cambia orario di tirocinio.'},
        {id:'negozio',text:'Un negozio riceve meno clienti del solito.'},
        {id:'sindaco',text:'Il sindaco firma l’ordine di chiusura.'},
        {id:'tecnici',text:'I tecnici controllano la struttura del ponte.'}
      ],
      answer:['tirocinio','negozio'],
      why:'Le prime due descrivono gli effetti del provvedimento sulla vita quotidiana; le altre sono azioni legate alla decisione e ai controlli.'
    },
    {
      id:'sguardo',type:'choice',objective:'Riconoscere il cambiamento del punto di vista narrativo',points:20,
      title:'La stessa notizia, due racconti',
      source:'Trasferimento: due brevi testi originali',
      passageA:'«Il ponte rimase chiuso. Il paese perse la sua strada più rapida verso il mercato.»',
      passageB:'«Marta guardò l’autobus partire. Pensò che sarebbe arrivata tardi al colloquio.»',
      prompt:'Che differenza c’è fra i due racconti?',
      options:[
        {id:'soggetti',text:'Il primo guarda il paese; il secondo segue Marta.'},
        {id:'momenti',text:'Il primo descrive il passato; il secondo mostra il futuro.'},
        {id:'cause',text:'Il primo mostra un problema; il secondo trova la soluzione.'}
      ],
      answer:'soggetti',
      why:'Il fatto collettivo è lo stesso, ma il racconto può inquadrarlo da lontano o attraverso l’esperienza particolare di Marta.'
    },
    {
      id:'trasferimento',type:'choice',objective:'Evitare una contrapposizione riduttiva fra epica e modernità',points:20,
      title:'Il destino comune esiste ancora?',
      source:'Sintesi e trasferimento: epica e contemporaneità',
      prompt:'Quale conclusione regge meglio il confronto fra Ettore e una persona di oggi?',
      options:[
        {id:'intreccio',text:'Anche oggi i fatti comuni orientano le scelte personali.'},
        {id:'separazione',text:'Nell’epica sono le scelte private a determinare tutti i ruoli.'},
        {id:'rappresentanza',text:'Nella vita moderna il futuro dipende solo dalle scelte personali.'}
      ],
      answer:'intreccio',
      why:'L’epica rende centrale il ruolo pubblico dell’eroe; oggi il racconto può seguire una vita particolare senza cancellare i fatti condivisi.'
    },
    {
      id:'scrittura',type:'writing',objective:'Argomentare in forma autonoma il legame individuo/comunità',points:0,
      title:'La tua conclusione',
      source:'Produzione autonoma di due frasi — correzione umana',
      prompt:'Scrivi due frasi: nella prima spiega quale destino collettivo affronta Ettore; nella seconda spiega come la chiusura del ponte entra nella vita di Marta. Puoi anche scriverle sul quaderno.',
      hint:'La tua risposta non viene giudicata automaticamente: puoi confrontarla con gli indicatori della guida per il docente.'
    }
  ]);
  const AUTOCORRECT=QUESTIONS.filter(q=>q.points>0);
  const ids=new Set(QUESTIONS.map(q=>q.id));
  function validate(){
    if(ids.size!==QUESTIONS.length)throw Error('ID duplicati');
    if(AUTOCORRECT.reduce((n,q)=>n+q.points,0)!==100)throw Error('Il totale non è 100');
    for(const q of QUESTIONS){
      if(!q.objective||!q.prompt||!q.source||!q.why&&q.type!=='writing')throw Error('Dati incompleti: '+q.id);
      if(q.type==='choice'){
        if(!q.options.some(o=>o.id===q.answer)||q.options.filter(o=>o.id===q.answer).length!==1)throw Error('Chiave scelta');
      }else if(q.type==='multi'){
        if(q.answer.length!==2||q.answer.some(x=>!q.options.some(o=>o.id===x)))throw Error('Chiave multi');
      }else if(q.type==='match'){
        if(q.pairs.length!==q.targets.length||q.pairs.some(p=>!q.targets.some(t=>t.id===q.answer[p.id])))throw Error('Associazioni');
      }else if(q.type==='order'){
        if(q.answer.length!==q.cards.length||q.cards.some(c=>!q.answer.includes(c.id)))throw Error('Ordine');
      }else if(q.type!=='writing')throw Error('Tipo non supportato');
    }
    return true;
  }
  validate();
  function hash(value){
    let v=2166136261;
    for(let i=0;i<value.length;i++){v^=value.charCodeAt(i);v=Math.imul(v,16777619);}
    return v>>>0;
  }
  function shuffle(options,seed,salt){
    const list=options.slice(),initial=options.map(o=>o.id).join('|');
    let st=hash(String(seed)+':'+salt);
    for(let i=list.length-1;i>0;i--){
      st=(Math.imul(st,1664525)+1013904223)>>>0;
      const j=st%(i+1);
      [list[i],list[j]]=[list[j],list[i]];
    }
    if(list.length>1&&list.map(o=>o.id).join('|')===initial){
      const n=list.length;[list[n-1],list[n-2]]=[list[n-2],list[n-1]];
    }
    return list;
  }
  function ordered(q,seed){
    if(q.type==='match')return shuffle(q.targets,seed,q.id);
    if(q.type==='order')return shuffle(q.cards,seed,q.id);
    return shuffle(q.options||[],seed,q.id);
  }
  function fresh(seed=0){
    if(!Number.isInteger(seed)||seed<0)throw Error('Seed non valido');
    const answers=Object.create(null);
    const first=QUESTIONS[0];
    answers[first.id]=ordered(first,seed).map(x=>x.id);
    return {version:VERSION,seed,index:0,answers,writing:'',submitted:false};
  }
  function canUse(state){
    return state&&state.version===VERSION&&Number.isInteger(state.seed)&&state.seed>=0&&
      Number.isInteger(state.index)&&state.index>=0&&state.index<QUESTIONS.length&&
      state.answers&&typeof state.answers==='object'&&typeof state.writing==='string'&&typeof state.submitted==='boolean';
  }
  function restore(raw){
    try{
      const parsed=typeof raw==='string'?JSON.parse(raw):raw;
      if(!canUse(parsed))return null;
      // Nessuna chiave esterna può cambiare domande, risposte o punteggio.
      const s=fresh(parsed.seed);
      s.index=parsed.index;
      s.submitted=parsed.submitted;
      s.writing=parsed.writing.slice(0,1600);
      for(const q of QUESTIONS){
        if(!Object.prototype.hasOwnProperty.call(parsed.answers,q.id))continue;
        const a=parsed.answers[q.id];
        if(q.type==='choice'&&typeof a==='string'&&q.options.some(o=>o.id===a))s.answers[q.id]=a;
        else if(q.type==='multi'&&Array.isArray(a)&&new Set(a).size===a.length&&a.every(id=>q.options.some(o=>o.id===id)))s.answers[q.id]=a.slice();
        else if(q.type==='match'&&a&&typeof a==='object'&&!Array.isArray(a)){
          const clean={};
          for(const p of q.pairs)if(q.targets.some(t=>t.id===a[p.id]))clean[p.id]=a[p.id];
          s.answers[q.id]=clean;
        }else if(q.type==='order'&&Array.isArray(a)&&a.length===q.cards.length&&new Set(a).size===a.length&&a.every(id=>q.cards.some(c=>c.id===id)))s.answers[q.id]=a.slice();
      }
      if(s.submitted&&!canSubmit(s))s.submitted=false;
      return s;
    }catch(_){return null;}
  }
  function answer(state,qid,value){
    if(!canUse(state)||state.submitted)throw Error('Sessione chiusa');
    const q=QUESTIONS.find(x=>x.id===qid);
    if(!q||q.type==='writing')throw Error('Domanda inesistente');
    const candidate=restore({...state,answers:{...state.answers,[qid]:value}});
    const equivalent=q.type==='match'
      ? candidate&&value&&typeof value==='object'&&!Array.isArray(value)&&
        Object.keys(value).every(key=>q.pairs.some(p=>p.id===key))&&
        q.pairs.every(p=>(candidate.answers[qid][p.id]||'')===(value[p.id]||''))
      : candidate&&JSON.stringify(candidate.answers[qid])===JSON.stringify(value);
    if(!equivalent)throw Error('Risposta non valida');
    return candidate;
  }
  function move(state,direction){
    if(!canUse(state)||state.submitted)throw Error('Sessione chiusa');
    const pos=Math.max(0,Math.min(QUESTIONS.length-1,state.index+direction));
    const next=restore({...state,index:pos});
    if(QUESTIONS[pos].type==='order'&&!next.answers[QUESTIONS[pos].id]){
      next.answers[QUESTIONS[pos].id]=ordered(QUESTIONS[pos],next.seed).map(x=>x.id);
    }
    return next;
  }
  function write(state,value){
    if(!canUse(state)||state.submitted)throw Error('Sessione chiusa');
    return restore({...state,writing:String(value).slice(0,1600)});
  }
  function answered(q,a){
    if(q.type==='choice')return typeof a==='string';
    if(q.type==='multi')return Array.isArray(a)&&a.length===q.answer.length;
    if(q.type==='match')return q.pairs.every(p=>a&&a[p.id]);
    if(q.type==='order')return Array.isArray(a)&&a.length===q.cards.length;
    return true;
  }
  function canSubmit(state){return canUse(state)&&AUTOCORRECT.every(q=>answered(q,state.answers[q.id]));}
  function points(q,a){
    if(!answered(q,a))return 0;
    if(q.type==='choice')return a===q.answer?20:0;
    if(q.type==='multi'){
      const hit=q.answer.filter(id=>a.includes(id)).length,wrong=a.filter(id=>!q.answer.includes(id)).length;
      return Math.max(0,10*hit-5*wrong);
    }
    if(q.type==='match')return 20*q.pairs.filter(p=>a[p.id]===q.answer[p.id]).length/q.pairs.length;
    if(q.type==='order')return 20*q.answer.filter((id,i)=>a[i]===id).length/q.answer.length;
    return 0;
  }
  function evaluate(state){
    if(!canSubmit(state))throw Error('Completa i cinque esercizi autocorretti');
    const results=AUTOCORRECT.map(q=>({id:q.id,earned:points(q,state.answers[q.id]),total:q.points,why:q.why,objective:q.objective}));
    return {score:Math.round(results.reduce((n,r)=>n+r.earned,0)),total:100,results,writingGraded:false};
  }
  function submit(state){
    if(!canSubmit(state))throw Error('Risposte insufficienti');
    return restore({...state,submitted:true});
  }
  return {VERSION,QUESTIONS,AUTOCORRECT,validate,shuffle,ordered,fresh,restore,answer,move,write,answered,canSubmit,points,evaluate,submit};
});