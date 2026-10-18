# Epica e romanzo — dall'individuo alla comunità

## Stato del percorso interattivo — 18 ottobre 2026

**Quattro storie implementate sul ramo `base-feudo`, ancora in PR in bozza.** Il ramo principale (`main`) non è stato modificato.

| Capitolo | Forma | Che cosa si capisce |
|---|---|---|
| **Ettore** | Cinque card introduttive, tre turni, mappa viva di Troia, scena con Andromaca, tre ruoli | La decisione individuale coinvolge il destino della città e della famiglia |
| **Achille e Patroclo** | Breve storia a scelta e confronto con la vicenda omerica | L'onore e l'amicizia diventano eventi pubblici |
| **Penelope e Ulisse** | La tela, due decisioni immaginarie, il ritorno a Itaca, tre personaggi | La casa è anche un ordine collettivo |
| **Destini generali — Nadia** | Tre turni contemporanei, tre punti di vista, due racconti dello stesso evento | Un destino comune può essere vissuto e narrato come vita particolare |

L'introduzione «Chi merita una storia?» è stata **già svolta** e non viene ripetuta. Il confronto contemporaneo è una **rielaborazione didattica originale**, non una ricostruzione storica o letteraria.

### Tecnologia riutilizzata

- `engine.js`: motore indipendente dalla storia, valido per scene, decisioni, pannelli di prospettive, indicatori, feedback, riepiloghi e salvataggi.
- `storie.js`: tutti gli episodi, i dialoghi didattici e i valori simulati.
- `epica-map.js`: SVG originali per Troia, Itaca e il quartiere contemporaneo.
- `epica-app.js`: interfaccia, navigazione e salvataggi locali, senza personaggi hardcoded.
- `stile.css` + `epica.css`: visual design del feudo, carte narrative animate, responsive.
- `legacy/feudo/`: codice vecchio archiviato per consultazione, non eseguito.

### Verifiche e accesso

- Test di motore, delle storie e dei percorsi in `tests/*.test.cjs`; eseguire `node --test tests/*.test.cjs` con Node recente.
- Controllo browser reale automatizzato in Chrome e screenshot in `.github/workflows/browser-smoke.yml`.
- **Da verificare manualmente**: iPhone reale, accessibilità e lettura effettiva con studenti. La PR rimane in bozza finché non c'è questa verifica.
- Per prova locale: `python3 -m http.server 8000` dalla cartella del progetto e apertura di `http://localhost:8000`.

La distinzione tra **racconto omerico** ed **esperimento controfattuale** è esplicita nella narrazione. Indicatori 0–100: metafore ludiche, non dati storici, non voti.

Documenti di approfondimento: [Review Ettore](docs/ETTORE-REVIEW.md), [Destini generali e contemporaneità](docs/DESTINI-GENERALI.md), [Progetto narrativo](docs/STORIE-E-SIMULAZIONE.md), [Base tecnica](docs/BASE-TECNICA.md).

---

## Attività conclusiva: «Una vita, molti destini»

Dopo i quattro capitoli è disponibile [l'attività finale](verifica.html), basata sulla skill didattica fornita dal docente. Sono **cinque esercizi autocorretti** con tipi diversi (ordinamento, associazione, due conseguenze, due confronti ragionati) e una **breve riflessione scritta non autocorretta**. Il punteggio 0–100 compare **solo alla fine** e non rappresenta un voto scolastico.

La verifica usa una situazione nuova (chiusura di un ponte e conseguenze per Marta e il paese) per controllare il trasferimento del concetto: individui e comunità sono legati sia nell'epica sia nella contemporaneità, pur cambiando il modo di raccontare le vite. Non ripete le domande già risolte nei capitoli.

Componenti tecnici separati: `finale.js` (dati, regole e correzione), `verifica-app.js` (interfaccia e ripristino), `verifica.html` e `verifica.css` (pagina nello stile del feudo). Il motore delle quattro storie resta invariato.

[Guida docente, soluzioni e audit didattico](docs/VERIFICA-FINALE.md). Sono presenti test Node e controlli browser su schermi mobili; la prova con studenti e la revisione linguistica del docente restano necessarie.

---

## Obiettivo della prima unità

Capire che nell'epica la vicenda di un individuo non è soltanto privata: i suoi gesti incarnano ruoli, valori e conflitti della comunità. Preparare il successivo confronto con la centralità della vita particolare nel romanzo moderno.

L'introduzione «Chi merita una storia?» è **già stata svolta**: non va ripetuta.

**Frase da saper spiegare:** «Ettore è padre, marito e difensore di Troia. Quando combatte, non difende solo se stesso: attraverso di lui è in gioco anche il destino della sua famiglia e della città».


## Nuova direzione: storie a scelte con conseguenze

Il formato approvato non è una sequenza di quiz: prima **card introduttive illustrate e animate** come nel prologo di sito-feudo; poi **simulazioni a scelte**, con indicatori che si modificano e spiegazioni dei costi per la comunità. **Ettore è la simulazione principale**, con mappa di Troia e indicatori Difesa / Provviste / Fiducia. Seguono storie diverse di Achille e Patroclo, Penelope e Ulisse; in conclusione una simulazione contemporanea sui destini collettivi e il confronto con la narrazione contemporanea.

Specifiche complete, turni, scelte, feedback e vincoli di fedeltà al testo: [docs/STORIE-E-SIMULAZIONE.md](docs/STORIE-E-SIMULAZIONE.md).

**Nota interpretativa:** le scelte ipotetiche sono una simulazione dichiarata; l'incontro canonico di Ettore e Andromaca è raccontato come nell'Iliade, non riscritto dai punteggi.

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
