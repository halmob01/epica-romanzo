# Ettore — Review della prima unità giocabile

Aggiornata al 18 ottobre 2026. Stato: **implementata su `base-feudo`**, test automatici superati; **non ancora verificata su telefono reale**.

## Percorso effettivo

1. **Cinque card introduttive**: assedio di Troia, funzione di Ettore, Andromaca e Astianatte, risorse limitate, spiegazione che le scelte del gioco sono immaginate.
2. **Tre turni di simulazione**, con mappa di Troia sempre visibile e indicatori Difesa, Provviste e Fiducia. Le alternative riguardano cibo, guardie e protezione delle abitazioni. Ogni decisione cambia le barre e lascia un costo: non basta cercare una risposta «giusta».
3. **Ritorno all'Iliade**: incontro con Andromaca, bambino che teme l'elmo, Ettore che lo toglie e torna a combattere. Il racconto originale è distinto dalle scelte controfattuali.
4. **Attività card «Una persona, tre legami»**: tre pulsanti — MARITO / Andromaca, PADRE / Astianatte, DIFENSORE / Troia. La figura centrale è sempre Ettore; toccando un legame si mette in evidenza la persona/città coinvolta e appare una spiegazione. Bisogna esplorare tutti e tre i legami prima di proseguire; anche la freccia destra non salta il vincolo.
5. **Domanda interpretativa** e **riepilogo personalizzato**: benefici e costi delle tre scelte effettivamente compiute, indicatori iniziali/finali, domanda sul rapporto fra gesto individuale e destino collettivo.

## Indicazioni per l'insegnante

**Domanda di partenza:** «Perché Ettore torna a combattere, anche se ama sua moglie e suo figlio?»

**Concetto finale:** «Per Ettore difendere Troia significa anche provare a proteggere Andromaca e Astianatte. I suoi ruoli di marito, padre e difensore della città non sono tre vite separate».

**Attenzione:** non presentare la guerra come un dovere meccanico che annulla l'affetto o la paura; la scena del congedo è commovente proprio perché Ettore e Andromaca conoscono il pericolo. La prospettiva *epica* emerge dal fatto che il gesto personale incarna anche un ruolo pubblico e un ordine di valori condivisi. Non sostenere che nell'epica manchi l'interiorità e nel romanzo, invece, conti soltanto la vita privata.

## Aspetto della mappa

Il mondo simulato rimane sempre Troia, anziché trasformarsi a ogni turno in una nuova vignetta. Le card illustrative cambiano invece scenario (magazzino, mura, famiglia, elmo).

Gli SVG mostrano un linguaggio grafico coerente con il sito-feudo, senza copiare castelli e case medievali: case a tetto piano stilizzate, mura, scorte, cittadini e difensori. Le quantità di cittadini, guardie, sacchi e le crepe delle mura variano con le misure; le variazioni sono segnali visivi didattici, non ricostruzioni archeologiche né cronaca di Omero. Le bandiere hanno un'animazione lieve, disabilitata da `prefers-reduced-motion`.

## Verifiche eseguite

I test `node --test tests/*.test.cjs` passano nella CI GitHub Actions. Comprendono:
- progressione narrativa, costi, limiti 0–100, salvataggi validi/non validi, riavvio, distinzione tra episodi e scelte inventate;
- un flusso automatizzato con DOM simulato: dalla prima card fino al riepilogo di Ettore, passando per tutte e tre le scelte e i tre ruoli;
- sessione Achille ripresa dopo il ricaricamento, navigazione con tasto freccia, SVG che cambiano con le misure;
- struttura del file HTML e dipendenze del motore.

**Non considerare il test con DOM simulato un collaudo visivo:** rimane necessario aprire la pagina su desktop e su un iPhone reale per verificare dimensioni, spazi, scroll, font, leggibilità e comportamento delle animazioni.

## Da fare in seguito

- Eventuali modifiche ai testi e al disegno dopo prova con il docente.
- Storia di Penelope/Ulisse, come piccola simulazione d'attesa.
- Confronto narrativo con un destino collettivo contemporaneo; la sezione conclusiva sui «destini generali» richiede un trattamento significativo e non deve ridursi a un quiz epica/romanzo.
