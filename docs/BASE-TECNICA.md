# Base tecnica recuperata da sito-game-template1

Stato: **copia tecnica da adattare, non app su Ettore e non materiale da distribuire alla classe**.

Questa base proviene da [sito-game-template1](https://github.com/halmob01/sito-game-template1), una versione modulare di [sito-feudo](https://github.com/halmob01/sito-feudo). L'operazione avviene sul ramo `base-feudo` di `epica-romanzo`, senza sostituire `main`.

## Cosa è stato riutilizzato

| File | Utilità | Cosa resta da cambiare |
|---|---|---|
| `index.html` | Impaginazione e ordine di caricamento | Titoli, accesso al percorso, punti e area docente |
| `stile.css` | Grafica del feudo, Alfa Slab One, Public Sans, rosso, nero, card | Eventuali etichette o dimensioni specifiche delle nuove storie |
| `prologo.js` | Motore delle card introduttive, scene SVG animate | **Illustrazioni e testi ancora romani**: sostituirli con Troia |
| `interfaccia.js` | Panelli, bottoni, navigazione, feedback | Testi, fasi della simulazione e classifica specifici del feudo |
| `mappa.js` | Tecniche canvas e animazioni della mappa | Nuova mappa di Troia; non usare castello medievale |
| `motore.js` | Stato, turni, applicazione variazioni, riepilogo | Rimuovere regole legate a granaio e feudo; modellare Difesa, Provviste, Fiducia |
| `contenuti.js` | Modello di dati con eventi e scelte | Tutti gli episodi del Medioevo vanno sostituiti |
| `comune.js` | Utility e salvataggio in locale | Coordinate e stagioni specifiche del feudo |
| `i18n.js` | Supporto arabo necessario al template | Traduzioni non pertinenti; rinviare i contenuti arabi per la prima unità |
| `config.js` | Isolamento delle chiavi del sito | Chiavi già differenziate; area docente deliberatamente non configurata |
| `.nojekyll` | Compatibilità con GitHub Pages | Nessun cambiamento |

La copia conserva la giocabilità del **vecchio feudo** come riferimento, non va scambiata per una versione del simulatore di Troia. Il banner in testa alla pagina lo dichiara esplicitamente.

## Vincoli e scelte

- Nessuna nuova credenziale: area docente disattivata/non configurata (`PW_HASH` non corrisponde al template); Google Sheet non collegato.
- Chiavi `KEY`, `LANG_KEY`, `DOC_KEY` e `SALT` specifiche di `epica-romanzo`, per non sovrascrivere il salvataggio di `sito-feudo` sugli stessi domini GitHub Pages.
- La copia costituisce un punto di partenza tecnico. I contenuti canonici di Omero saranno differenziati dai bivi controfattuali.
- Il documento guida della nuova applicazione resta [STORIE-E-SIMULAZIONE.md](STORIE-E-SIMULAZIONE.md): Ettore come esperienza centrale; poi Achille/Patroclo, Penelope/Ulisse e un destino contemporaneo.
- Prima di pubblicare, separare e testare il nuovo motore, le scene, il reset, le conseguenze e il comportamento su mobile.

## Prossimo lavoro

1. Riutilizzare lo stile delle card di `prologo.js`, sostituendo le scene con 5 SVG narrativi su Troia.
2. Riutilizzare la shell di `index.html`, gli indicatori e la gestione delle scelte, creando la nuova mappa di Troia.
3. Costruire 3 turni di scelte di Ettore: provviste, mura, famiglie; mostrare la variazione degli indicatori e spiegare il costo della decisione.
4. Narrare l'incontro canonico con Andromaca e Astianatte, senza alterarne arbitrariamente l'esito attraverso il punteggio.
5. Eseguire le prove didattiche e tecniche; solo allora unire i file adatti alla pubblicazione.
