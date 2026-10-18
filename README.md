# Epica e romanzo — dall'individuo alla comunità

Stato: **progetto didattico definito, applicazione da costruire**. Materiale di partenza: le 12 slide «L'epica — le vite che rappresentano un mondo» e il testo di lezione del docente.

## Obiettivo della prima unità

Capire che nell'epica la vicenda di un individuo non è soltanto privata: i suoi gesti incarnano ruoli, valori e conflitti della comunità. Preparare il successivo confronto con la centralità della vita particolare nel romanzo moderno e con la filosofia implicita del romanzo studiata attraverso Guido Mazzoni.

L'introduzione «Chi merita una storia?» è **già stata svolta**: non va ripetuta.

**Frase da saper spiegare:** «Ettore è padre, marito e difensore di Troia. Quando combatte, non difende solo se stesso: attraverso di lui è in gioco anche il destino della sua famiglia e della città».

## Priorità assoluta: Ettore

Ettore deve essere il nucleo concettuale e interattivo dell'unità, non uno dei tanti quiz.

1. **Prologo illustrato (5 brevi card):** (i) i Greci assediano Troia; (ii) Ettore è il difensore della città; (iii) Andromaca lo supplica di restare, perché teme di perdere marito, padre del figlio e città; (iv) Astianatte ha paura dell'elmo, Ettore lo toglie e prende in braccio il figlio; (v) Ettore torna a combattere, pur conoscendo il pericolo.
2. **Attività «Una persona, tre ruoli»:** associare a Ettore padre/Astianatte, marito/Andromaca, difensore/Troia; poi osservare come questi ruoli si intrecciano.
3. **Attività «Se Ettore muore, che cosa cambia?»:** collegare una scelta e una sorte personale alle conseguenze per famiglia e città. Far comparire conseguenze progressive e spiegazioni, non soltanto esiti giusto/sbagliato.
4. **Domanda di trasferimento:** «Perché nell'epica il gesto di Ettore non riguarda soltanto Ettore?». Prima selezione guidata, poi frase da completare.

**Vincolo interpretativo:** evitare un videogioco morale che contrapponga semplicisticamente «salva la famiglia» a «salva la città». Nella lettura del testo proposta dal docente la difesa della famiglia e quella della città sono connesse: questo è il punto da far scoprire, senza cancellare la paura o la tensione personale della scena.

## Percorso complessivo (la prima unità)

- **Orientamento narrativo:** contestualizzare la guerra di Troia per chi non conosce Iliade e Odissea; spiegare «epica», «eroe», «comunità» con frasi brevi.
- **Capitolo centrale — Ettore:** prologo a card e attività sui ruoli e le conseguenze.
- **Achille e Patroclo:** poche card esplicative su offesa, ritiro, difficoltà dell'esercito, morte di Patroclo e ritorno di Achille; riordinamento di eventi e individuazione del valore collettivo dell'onore.
- **Ulisse:** poche card su viaggio e ritorno a Itaca; associazione di ruoli di re, padre e marito. Penelope e Telemaco come breve supporto, non capitoli lunghi.
- **Sintesi finale:** tre piccoli casi, schema ricorrente «persona → gesto → conseguenza → ruolo/valore collettivo», una verifica su un episodio non già risolto con identiche parole.
- Borges, dèi e morte possono essere approfondimenti futuri; non sono indispensabili per la prima lezione.

## Visual design

**Riprendere fedelmente `sito-feudo` nelle scelte visive e nell'esperienza di prologo, non copiarne il gioco gestionale.**

Riferimento: https://github.com/halmob01/sito-feudo

- Font: Alfa Slab One (display), Public Sans (UI).
- Palette: bianco `#ffffff`, inchiostro `#1c1416`, rosso `#c8102e`, carta `#fbf7f2`.
- Card introduttive come nel prologo originale: bordo nero da 3px, ombra rossa spostata, scena SVG 16:9 sopra, testo grande sotto, entrata progressiva, puntini di avanzamento, «Avanti» e «Salta».
- **Illustrazioni SVG originali**, animate con sobrietà e coerenti nella scala. Non servono fotografie né scene 3D.
- Responsive mobile, comandi grandi; funzionamento anche con animazioni ridotte. Possibilità di ripetere le card.

## Come costruire

Nuova repo autonoma. **Non copiare integralmente `sito-feudo/index.html`** (include la simulazione del feudo e logica storica non pertinente), né trapiantare `motore.js` da `sito-game-template1` senza riscrittura: il README del template riconosce ancora accoppiamenti con granaio, crisi, ordini e punteggi.

Implementazione semplice: HTML/CSS/JS statici per GitHub Pages, card narrative e SVG separati dai dati degli esercizi. Riprodurre/adattare solo CSS utile del prologo, pattern visivi e gestione navigazione; attività brevi con feedback argomentato. Le risposte corrette non devono essere riconoscibili dalla lunghezza o dalla posizione; distrattori plausibili e opzioni mescolate.

## Verifica didattica prima della pubblicazione

- Un allievo che non ha mai sentito «Ettore» capisce ogni scena?
- Sa rispondere non solo «che cosa succede?» ma anche «perché è importante per la comunità?»?
- Sa collegare famiglia e città senza ridurre la scena a «scegli fra due cose opposte»?
- Test su telefono reale e desktop; prova completa di tutti i bivi, ordine degli eventi, feedback, ripartenza.
