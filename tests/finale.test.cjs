'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const quiz=require('../finale.js');

function perfect(seed=29){
  let state=quiz.fresh(seed);
  for(const q of quiz.AUTOCORRECT){
    state=quiz.answer(state,q.id,
      q.type==='match'?{...q.answer}:
      q.type==='order'?q.answer.slice():
      q.type==='multi'?q.answer.slice():q.answer);
  }
  return state;
}
test('copertura delle operazioni cognitive: cinque formati valutabili più scrittura',()=>{
  assert.equal(quiz.validate(),true);
  assert.deepEqual(quiz.QUESTIONS.map(q=>q.type),['order','match','multi','choice','choice','writing']);
  assert.equal(quiz.AUTOCORRECT.reduce((v,q)=>v+q.points,0),100);
  assert.equal(quiz.QUESTIONS.at(-1).points,0);
  assert.equal(new Set(quiz.QUESTIONS.map(q=>q.objective)).size,6);
});
test('nessun punteggio prima della consegna',()=>{
  const s=quiz.fresh(10);
  assert.equal(s.submitted,false);
  assert.equal(quiz.canSubmit(s),false);
  assert.throws(()=>quiz.submit(s));
});
test('correzione perfetta indipendente dall’ordine grafico',()=>{
  for(let seed=0;seed<50;seed++){
    const state=perfect(seed);
    assert.equal(quiz.canSubmit(state),true);
    const finished=quiz.submit(state);
    assert.equal(finished.submitted,true);
    const result=quiz.evaluate(finished);
    assert.equal(result.score,100);
    assert.equal(result.total,100);
    assert.equal(result.writingGraded,false);
    assert.throws(()=>quiz.answer(finished,'sguardo','soggetti'));
  }
});
test('associazioni accettate anche se selezionate in ordine diverso',()=>{
  let s=quiz.fresh(23);
  s=quiz.answer(s,'legami',{penelope:'itaca'});
  s=quiz.answer(s,'legami',{penelope:'itaca',achille:'greci'});
  s=quiz.answer(s,'legami',{penelope:'itaca',achille:'greci',ettore:'troia'});
  assert.equal(quiz.points(quiz.QUESTIONS[1],s.answers.legami),20);
});
test('parziali senza regalare punti per selezioni errate',()=>{
  const order=quiz.QUESTIONS[0],match=quiz.QUESTIONS[1],multi=quiz.QUESTIONS[2];
  assert.equal(quiz.points(order,['b','a','c','d']),10);
  assert.ok(Math.abs(quiz.points(match,{ettore:'troia',achille:'greci',penelope:'greci'})-40/3)<.001);
  assert.equal(quiz.points(multi,['negozio','sindaco']),5);
  assert.equal(quiz.points(multi,['sindaco','tecnici']),0);
});
test('la consegna richiede esattamente le due conseguenze',()=>{
  let s=perfect();
  s=quiz.answer(s,'effetti',['tirocinio']);
  assert.equal(quiz.canSubmit(s),false);
  assert.throws(()=>quiz.submit(s));
  s=quiz.answer(s,'effetti',['tirocinio','negozio']);
  assert.equal(quiz.canSubmit(s),true);
});
test('salvataggio, riflessione libera e punteggio sono separati',()=>{
  let s=perfect();
  s=quiz.write(s,'Ettore difende Troia. Marta teme di arrivare tardi al colloquio.');
  const restored=quiz.restore(JSON.stringify(s));
  assert.equal(restored.writing,s.writing);
  assert.equal(quiz.evaluate(restored).score,100);
  assert.equal(quiz.evaluate(restored).writingGraded,false);
  assert.equal(quiz.restore('garbage'),null);
  assert.equal(quiz.restore({...s,version:999}),null);
});
test('mescolamento deterministico e non fissato alla stessa lettera',()=>{
  for(const q of quiz.AUTOCORRECT.filter(q=>q.type==='choice')){
    const indices=new Set();
    for(let seed=0;seed<120;seed++){
      const ids=quiz.ordered(q,seed).map(o=>o.id);
      assert.deepEqual(ids,quiz.ordered(q,seed).map(o=>o.id),'ridisegno stabile');
      indices.add(ids.indexOf(q.answer));
    }
    assert.ok(indices.size>=2,'chiave sempre nella stessa posizione: '+q.id);
    assert.equal(new Set(q.options.map(o=>o.text.trim().toLowerCase())).size,q.options.length);
    const lengths=q.options.map(o=>o.text.length);
    const correct=q.options.find(o=>o.id===q.answer).text.length;
    assert.ok(correct<=Math.max(...lengths),'lunghezza');
    assert.notEqual(correct,Math.max(...lengths),'corretta unica piu lunga: '+q.id);
  }
});
test('nessuna domanda richiede il testo di risposta libera per sbloccare il finale',()=>{
  const s=perfect();
  assert.equal(s.writing,'');
  assert.equal(quiz.submit(s).submitted,true);
});
