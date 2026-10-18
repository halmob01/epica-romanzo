# Base tecnica riutilizzata dal feudo

Stato aggiornato: **18 ottobre 2026**. L'importazione originale è stata completata e **rifattorizzata**.

La fonte è [sito-game-template1](https://github.com/halmob01/sito-game-template1), versione modulare del progetto [sito-feudo](https://github.com/halmob01/sito-feudo).

## Che cosa è stato copiato

Dal progetto originale sono stati recuperati l'identità visiva (`stile.css`), il pattern di prologo SVG, la disposizione mappa/indicatori/pannello, i feedback delle scelte e l'organizzazione dei moduli. La vecchia logica è conservata a scopo di riferimento nella cartella `legacy/feudo/` del ramo `base-feudo`.

I file archiviati (`motore.js`, `contenuti.js`, `mappa.js`, `prologo.js`, `interfaccia.js`, `i18n.js`, `comune.js`, `config.js`) **non vengono più caricati dalla pagina**. L'obiettivo del riuso è evitare di riscrivere da zero l'esperienza e il sistema visivo, non trascinare nel nuovo gioco dipendenze da castelli, granaio e feudalesimo.

## Architettura attiva

| File | Responsabilità | Dipende da |
|---|---|---|
| `engine.js` | Valida contenuti, inizializza sessioni, applica effetti, avanza nelle scene, ricostruisce i salvataggi, genera un riepilogo | Nessuna dipendenza dal browser o dalla storia |
| `storie.js` | Dati narrativi e scelte di Ettore e Achille | Nessuna funzione di motore |
| `epica-map.js` | Disegna scene SVG e aggiornamenti visivi basati sugli indicatori | Nessuna funzione di motore |
| `epica-app.js` | Collega motore, storie e disegni a DOM, pulsanti e localStorage | Tre moduli precedenti |
| `index.html` | Struttura della pagina e ordine di caricamento | File CSS e JS |
| `stile.css`, `epica.css` | Visual design identico nello spirito al feudo, layout responsive | Browser |
| `tests/*.test.cjs` | Prove automatiche, anche per salvataggi contraffatti e indicatori al limite | Node 20+ |

Il motore è costruito attorno a:
- `story.stats`: ID, etichetta e valore iniziale 0–100.
- `story.scenes`: `narrative`, `decision` e `reflection`.
- `choices[].effects`: variazioni numeriche per ciascun indicatore.
- `choices[].feedback` e `choices[].why`: conseguenza della decisione e sua interpretazione.
- `scene.afterEffects`: costo condiviso dopo una scelta, per esempio l'assedio che consuma risorse.
- `session`: stato della partita, indice e fase, decisioni, indicatori. La funzione `restore` verifica il salvataggio rigiocando la progressione, invece di fidarsi dei numeri archiviati.

Il motore non attribuisce un «voto» ai risultati della città e non ammette due scelte nello stesso turno.

## Distinzione fra Omero e ipotesi

Le card raccontano episodi dell'Iliade in una semplificazione per studenti principianti. I tre turni di governo della città sono **esercizi ipotetici**, con valori arbitrari a scopo didattico; non attribuirli a Omero. Nell'incontro con Andromaca e Astianatte il racconto torna alla vicenda omerica e non permette di cambiare il destino canonico attraverso le misure.

## Verifiche e limiti

Verifiche automatiche Node: `node --test tests/*.test.cjs`; GitHub Actions si avvia nel ramo e nella PR. Ci sono controlli su progressione, effetti, limiti, ripristino, struttura file, qualità narrativa di base e SVG.

**Da fare prima dell'unione a main e dell'uso con studenti**:
1. Prova manuale completa su desktop e su un telefono reale, sia Ettore sia Achille.
2. Controllo leggibilità e navigazione delle card e delle conseguenze, incluse animazioni ridotte.
3. Revisione linguistico-storica del testo della lezione.
4. In seguito aggiungere Penelope/Ulisse, quindi il capitolo moderno sul modo di raccontare i destini generali.

Il vecchio motore del feudo **non va reimportato nella radice**: i nuovi argomenti devono essere implementati soltanto come dati di storia e, quando necessario, SVG specifici.
