/* Contenuti, non regole: episodi di Omero distinti dai bivi ipotetici.
   Le variazioni numeriche sono meccaniche didattiche, NON dati storici. */
(function (root) {
  'use strict';
  const TROY = {
    id: 'ettore', title: 'ETTORE', subtitle: 'Una città sulle spalle',
    source: 'Iliade, libro VI: il congedo da Andromaca (rielaborazione didattica)',
    insight: 'Ettore è padre, marito e difensore di Troia. Nell’epica la sua scelta personale coinvolge la famiglia e la comunità, perché questi ruoli sono legati.',
    stats: [
      { id: 'difesa', label: 'Difesa', start: 65 },
      { id: 'provviste', label: 'Provviste', start: 60 },
      { id: 'fiducia', label: 'Fiducia', start: 60 }
    ],
    scenes: [
      { id: 'troia', type: 'narrative', title: 'La città assediata',
        text: 'Da molti anni i Greci combattono contro Troia. Dietro le mura ci sono case, soldati, famiglie e bambini.',
        art: 'troia', historical: true },
      { id: 'eroe', type: 'narrative', title: 'Il difensore',
        text: 'Ettore è un guerriero troiano. Gli abitanti contano su di lui: quando esce a combattere, prova a difendere tutta la città.',
        art: 'mura', historical: true },
      { id: 'famiglia', type: 'narrative', title: 'Un padre, un marito',
        text: 'Ettore ha una moglie, Andromaca, e un figlio piccolo, Astianatte. Se Troia cade, anche loro saranno in pericolo.',
        art: 'famiglia', historical: true },
      { id: 'assedio', type: 'narrative', title: 'Il peso dell’assedio',
        text: 'In una città assediata servono cibo, protezione e fiducia. Le risorse non sono infinite: ogni decisione può aiutare qualcuno e danneggiare qualcun altro.',
        art: 'magazzino', historical: false },
      { id: 'regole', type: 'narrative', title: 'Ora decidi tu',
        text: 'Per tre turni immaginerai di essere Ettore. Le tue scelte sono inventate per il gioco: non sono episodi raccontati da Omero. Guarda come cambia Troia.',
        art: 'scelta', historical: false },
      { id: 'pane', type: 'decision', title: 'Le famiglie chiedono pane',
        text: 'I magazzini hanno poche scorte. Anche i soldati hanno fame. Come distribuisci il cibo?',
        art: 'magazzino', afterEffects: { difesa: -3, provviste: -4 },
        afterText: 'Intanto l’assedio continua: ogni giorno consuma viveri e indebolisce le difese.',
        choices: [
          { id: 'famiglie', label: 'Apri il magazzino alle famiglie', effects: { provviste: -15, fiducia: 12 },
            feedback: 'Le famiglie ricevono il pane; si fidano di più di te. Ma le scorte per i prossimi giorni sono minori.',
            why: 'Un gesto di Ettore cambia la vita dei cittadini, non soltanto la sua.' },
          { id: 'soldati', label: 'Riservi più cibo ai soldati', effects: { difesa: 8, provviste: -8, fiducia: -10 },
            feedback: 'Le guardie hanno la forza di difendere il portone. Alcune famiglie, invece, si sentono dimenticate.',
            why: 'Difendere le mura e proteggere gli abitanti non sempre richiedono la stessa decisione.' },
          { id: 'razioni', label: 'Riduci le razioni di tutti', effects: { difesa: -5, provviste: 8, fiducia: -6 },
            feedback: 'Risparmi del cibo, ma la fame rende le persone più stanche e preoccupate.',
            why: 'La scorta che salvi oggi può avere un costo per tutta Troia.' }
        ] },
      { id: 'mura', type: 'decision', title: 'Il pericolo alle mura',
        text: 'Le sentinelle vedono muoversi i Greci. Le guardie sono poche e bisogna scegliere dove mandarle.',
        art: 'mura', afterEffects: { difesa: -3, provviste: -4 },
        afterText: 'La città resta sotto pressione: il tempo ha un costo anche quando scegli con attenzione.',
        choices: [
          { id: 'portone', label: 'Rinforzi il portone della città', effects: { difesa: 13, provviste: -8 },
            feedback: 'Il portone resiste meglio. Hai però consumato materiali e risorse preziose.',
            why: 'La difesa militare della città richiede sacrifici a tutti.' },
          { id: 'riparo', label: 'Metti al sicuro le famiglie vicine alle mura', effects: { difesa: -7, fiducia: 13, provviste: -5 },
            feedback: 'Le famiglie sono più protette. Meno persone, però, possono sorvegliare le mura.',
            why: 'Aiutare gli abitanti può ridurre nell’immediato la forza delle difese.' },
          { id: 'cittadini', label: 'Chiedi ai cittadini di aiutare le guardie', effects: { difesa: 7, fiducia: -8 },
            feedback: 'Le mura hanno nuovi difensori. Alcuni cittadini, spaventati, non volevano combattere.',
            why: 'La guerra entra nella vita di chiunque abiti Troia.' }
        ] },
      { id: 'notte', type: 'decision', title: 'La notte di Troia',
        text: 'Un messaggero annuncia un pericolo vicino alle case. Se mandi tutti i rinforzi da una parte, l’altra resta esposta.',
        art: 'notte', afterEffects: { difesa: -3, provviste: -4 },
        afterText: 'La città sopravvive a un’altra notte. Ma il pericolo non è scomparso.',
        choices: [
          { id: 'case', label: 'Proteggi le case più esposte', effects: { difesa: -6, fiducia: 10, provviste: -5 },
            feedback: 'Molte famiglie trovano riparo; un tratto di mura, però, resta meno difeso.',
            why: 'Ettore prova a proteggere le famiglie di Troia, non una soltanto.' },
          { id: 'cancello', label: 'Concentri le guardie al cancello', effects: { difesa: 10, fiducia: -8 },
            feedback: 'Il cancello è protetto, ma alcuni quartieri temono di essere stati abbandonati.',
            why: 'La sicurezza di un luogo non coincide sempre con quella di ogni suo abitante.' },
          { id: 'dividere', label: 'Dividi le guardie fra mura e case', effects: { difesa: 3, fiducia: 3, provviste: -9 },
            feedback: 'La protezione è più distribuita. Tenere tutti mobilitati, però, costa risorse.',
            why: 'Una decisione apparentemente equilibrata non elimina i sacrifici.' }
        ] },
      { id: 'andromaca', type: 'narrative', title: 'Andromaca lo ferma',
        text: 'Ora torniamo all’Iliade. Andromaca supplica Ettore di non andare in battaglia: teme di perdere il marito e di lasciare il figlio senza padre.',
        art: 'famiglia', historical: true },
      { id: 'elmo', type: 'narrative', title: 'Il bambino e l’elmo',
        text: 'Astianatte si spaventa vedendo il grande elmo del padre. Ettore lo toglie, sorride e prende il bambino fra le braccia.',
        art: 'elmo', historical: true },
      { id: 'dovere', type: 'narrative', title: 'Ettore torna a combattere',
        text: 'Ettore sa che Troia è in pericolo. Ama la famiglia, ma sente anche il dovere di difendere la città. Non può separare facilmente le due cose.',
        art: 'scelta', historical: true },
      { id: 'interpretazione', type: 'reflection', title: 'Una vita, un destino comune',
        text: 'Quale frase spiega meglio perché la vicenda di Ettore è un esempio di epica?',
        art: 'troia', choices: [
          { id: 'coraggio', label: 'Ettore è coraggioso perché non prova paura.', feedback: 'Ettore sa che potrebbe morire. Il suo valore non dipende dall’assenza di paura.', why: 'Guarda come il racconto lega l’amore per la famiglia alla responsabilità verso Troia.', correct: false },
          { id: 'ruoli', label: 'Il suo dovere di padre e quello verso Troia sono legati.', feedback: 'Esatto: il destino della sua famiglia e quello della città sono intrecciati.', why: 'Nell’epica, attraverso la vicenda personale di Ettore vediamo il mondo a cui appartiene.', correct: true },
          { id: 'individuale', label: 'Ettore combatte per seguire un progetto soltanto personale.', feedback: 'Non è soltanto una decisione per sé: sono coinvolti famiglia, cittadini e valori comuni.', why: 'Per Ettore il ruolo pubblico non resta fuori dalla vita familiare.', correct: false }
        ] },
      { id: 'finale', type: 'narrative', title: 'La storia di una città',
        text: 'Le tue scelte nel gioco hanno cambiato le misure di Troia. Nell’Iliade, la vicenda di Ettore mette in scena qualcosa di più grande di un solo uomo: anche il destino di una comunità.',
        art: 'troia', historical: false }
    ]
  };

  const ACHILLE = {
    id: 'achille', title: 'ACHILLE', subtitle: 'L’offesa diventa guerra',
    source: 'Iliade, libri I e XVI–XVIII (rielaborazione didattica)',
    insight: 'L’onore ferito di Achille e la morte di Patroclo non restano fatti privati: coinvolgono l’intero esercito.',
    stats: [
      { id: 'esercito', label: 'Forza dei Greci', start: 60 },
      { id: 'onore', label: 'Onore riconosciuto', start: 40 },
      { id: 'rischio', label: 'Sicurezza dei compagni', start: 65 }
    ],
    scenes: [
      { id: 'contesto', type: 'narrative', title: 'Achille e il suo onore', text: 'Achille è un grande guerriero greco. Agamennone gli sottrae Briseide. È un’offesa pubblica al suo valore, non soltanto un litigio privato.', art: 'scelta', historical: true },
      { id: 'ritiro', type: 'narrative', title: 'Un esercito senza Achille', text: 'Achille smette di combattere. I Greci cominciano a perdere. L’offesa fatta a un uomo cambia il destino di molti.', art: 'mura', historical: true },
      { id: 'bivio', type: 'decision', title: 'E se tu fossi Achille?', text: 'Queste alternative sono inventate per esplorare le conseguenze. Che cosa scegli?', art: 'scelta',
        choices: [
          { id: 'torna', label: 'Torni subito ad aiutare i Greci', effects: { esercito: 14, onore: -8, rischio: 10 }, feedback: 'L’esercito ritrova il suo guerriero più forte. Ma l’offesa di Agamennone non è stata risolta.', why: 'L’onore personale entra in tensione con il bisogno dell’esercito.' },
          { id: 'resta', label: 'Rimani lontano dalla battaglia', effects: { esercito: -16, onore: 5, rischio: -14 }, feedback: 'Non accetti l’umiliazione. Senza di te, però, i compagni combattono in maggiore difficoltà.', why: 'Una decisione personale cambia la situazione collettiva.' },
          { id: 'armatura', label: 'Presti la tua armatura a Patroclo', effects: { esercito: 7, rischio: -12 }, feedback: 'I Greci si sentono incoraggiati. Patroclo, però, corre un grande rischio.', why: 'Anche un gesto di amicizia pesa sul destino della guerra.' }
        ] },
      { id: 'omerica', type: 'narrative', title: 'Che cosa accade nell’Iliade?', text: 'Nella storia di Omero, Patroclo indossa l’armatura di Achille e viene ucciso da Ettore. Il dolore spinge Achille a tornare a combattere.', art: 'notte', historical: true },
      { id: 'sintesi', type: 'reflection', title: 'La domanda importante', text: 'Perché il litigio fra Achille e Agamennone è più di una questione privata?', art: 'mura', choices: [
        { id: 'privato', label: 'Perché i due guerrieri non si sopportano.', feedback: 'Il conflitto è più grande di una semplice antipatia.', why: 'Conta il riconoscimento pubblico del valore del guerriero.', correct: false },
        { id: 'briseide', label: 'Perché Achille vuole vendicarsi di Briseide.', feedback: 'Il punto centrale non è la vendetta contro Briseide.', why: 'Agamennone ferisce il prestigio pubblico di Achille.', correct: false },
        { id: 'onore', label: 'Perché l’onore di Achille è un valore condiviso dai Greci.', feedback: 'Esatto. L’offesa mette in crisi i rapporti di forza e di riconoscimento dell’esercito.', why: 'Il personale diventa collettivo.', correct: true }
      ] },
      { id: 'fine', type: 'narrative', title: 'Un esercito, molte vite', text: 'La rabbia di Achille, l’affetto per Patroclo e la guerra non sono storie separate: la vita di uno coinvolge il destino di molti.', art: 'troia', historical: false }
    ]
  };

  const STORIES = Object.freeze({ ettore: TROY, achille: ACHILLE });
  if (typeof module === 'object' && module.exports) module.exports = STORIES;
  else root.EpicaStories = STORIES;
})(typeof globalThis === 'object' ? globalThis : this);
