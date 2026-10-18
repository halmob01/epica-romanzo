# Attività finale — Una vita, molti destini

**Stato:** implementazione nel ramo `attivita-finale`; prova automatica da integrare al percorso. Il documento separa consegne per gli studenti da chiavi e criteri per il docente.

## 1. Contesto e scopo

- **Destinatari:** prima formazione professionale, allievi di circa 15–16 anni; lingua chiara e testi brevi, senza richiedere conoscenza preventiva dei miti al di fuori delle quattro storie proposte.
- **Fonte didattica:** i capitoli su Ettore, Achille/Patroclo, Penelope/Ulisse e Nadia, più la discussione sul rapporto persona/comunità.
- **Durata prevista:** 15–20 minuti, da verificare con la classe.
- **Formato:** pagina autonoma `verifica.html`, utilizzabile su telefono. Risultato al termine, sessione salvata localmente.
- **Natura della prova:** consolidamento e verifica di comprensione. Il punteggio automatico non costituisce da solo un voto scolastico e **non** misura la competenza di scrittura.

La domanda centrale è: **come entra un destino che riguarda molti nella vita e nella storia di una persona?** Il caso del ponte chiuso è originale: serve a trasferire il concetto fuori dagli episodi già risolti nell'app.

## 2. Matrice obiettivi → evidenze → esercizi

| ID | Obiettivo osservabile | Prova | Punti |
|---|---|---|---:|
| `catena` | Ricostruire il nesso tra minaccia, decisione individuale e conseguenze comuni | Ordinare 4 momenti di una piena e della chiusura di un ponte | 20 |
| `legami` | Collegare protagonista epico a persone/istituzioni coinvolte | Associare Ettore, Achille e Penelope a Troia, Greci, Itaca | 20 |
| `effetti` | Distinguere le conseguenze del fatto pubblico dalle azioni che lo gestiscono | Individuare 2 effetti nella quotidianità dopo la chiusura del ponte | 20 |
| `sguardo` | Confrontare prospettiva panoramica e vita particolare | Distinguere descrizione del paese e pensieri di Marta | 20 |
| `trasferimento` | Evitare la semplificazione epica = collettivo / oggi = privato | Scegliere la conclusione coerente con le quattro storie | 20 |
| `scrittura` | Produrre due frasi motivate sul legame persona/comunità | Due frasi su Ettore e Marta | Non valutata automaticamente |

**Totale parte autocorretta:** 100 punti. È sempre visualizzato **solo dopo la consegna**.

### Regole trasparenti di attribuzione dei punti

- Ordinamento: **5 punti per ogni evento nella posizione corretta** (4 × 5).
- Associazione: **20/3 punti per ogni coppia corretta** (3 coppie); il risultato complessivo viene arrotondato una sola volta alla fine.
- Individuazione delle due conseguenze: **10 punti per risposta giusta, meno 5 per risposta errata**, senza scendere sotto 0. Sono richieste esattamente due opzioni.
- Due scelte singole: **20 punti ciascuna** se corretta, 0 altrimenti.
- Produzione scritta: **esclusa dal punteggio**, con riscontro del docente o autovalutazione guidata.

Le risposte possono essere riviste durante l'attività; il sistema non indica giusto/sbagliato prima della consegna. A conclusione, un riepilogo spiega ogni soluzione.

## 3. Soluzioni per il docente — non mostrare prima della prova

**Ordinamento:** (1) il fiume sale; (2) la guardiana chiude il ponte; (3) i mercanti non raggiungono il mercato; (4) i negozianti restano senza merci e cercano un altro percorso.

**Associazioni:** Ettore → sicurezza della città e delle famiglie; Achille → tenuta dei compagni in battaglia; Penelope → continuità della casa e del regno.

**Due conseguenze:** l'apprendista cambia orario di tirocinio; il negozio riceve meno clienti. Le altre due frasi descrivono la decisione di chiusura e un controllo tecnico, non direttamente la conseguenza quotidiana su persone e attività.

**Cambio di sguardo:** la prima narrazione descrive il paese, la seconda si avvicina all'esperienza di Marta. Non significa che il problema collettivo scompaia.

**Trasferimento:** anche oggi i fatti comuni orientano le scelte personali. La differenza riguarda i modi di vivere e raccontare la relazione con la comunità, non la sua esistenza o assenza.

## 4. Guida per correggere la parte scritta

Consegna: «Scrivi due frasi: nella prima spiega quale destino collettivo affronta Ettore; nella seconda spiega come la chiusura del ponte entra nella vita di Marta. Puoi anche scriverle sul quaderno».

Indicazioni da osservare senza attribuire un numero automaticamente:

- **Collegamento giustificato:** per Ettore è chiaro il rapporto tra famiglia e Troia, non soltanto la descrizione «è un guerriero».
- **Trasferimento riuscito:** Marta è una persona comune e il problema del ponte diventa un problema di spostamenti e colloquio; il ponte riguarda anche il paese.
- **Distinzione non schematica:** non sostenere che nell'epica non ci siano emozioni o che oggi esistano solo interessi individuali.
- **Espressione:** due frasi comprensibili con un nesso causale; valutare la precisione senza sovrastimare difficoltà di scrittura non pertinenti all'obiettivo letterario.

Un esempio *non da mostrare in anticipo*: «Ettore difende Troia, perciò il suo destino riguarda anche sua moglie, il figlio e gli abitanti della città. Marta vive una conseguenza della chiusura del ponte perché deve cambiare il modo di raggiungere un colloquio».

Se si volesse trasformare la prova in una vera **verifica scolastica valutata**, occorrerebbe definire separatamente come includere, osservare e pesare la scrittura nella rubrica 0–100. Non attribuire automaticamente competenze non osservate.

## 5. Audit della skill `verifiche-didattiche`

### Audit automatico effettuato sul campione normalizzato

È stato eseguito `scripts/audit_questions.py` della skill allegata sui **due soli quesiti `choice`** (`sguardo`, `trasferimento`) in formato JSON normalizzato, rispettando la distinzione tra schema di audit e schema runtime della repo.

- Quesiti a scelta singola: **2**.
- Errori strutturali: **0**.
- Avvisi euristici residui: **0**.
- Corrette uniche più lunghe: **0/2**.
- Rapporti lunghezza corretta/distrattore più lungo: **0,915** e **0,862**.
- Entrambe le chiavi sorgente sono la prima opzione, ma la **UI le mescola in modo riproducibile per seed**: il dato sorgente non equivale alla posizione mostrata.

Si tratta di un **campione troppo piccolo** per dichiarare statisticamente bilanciata l'intera verifica. Il test automatico dedicato verifica la stabilità del mescolamento e che le corrette non restino sempre nella stessa posizione. L'auditor non controlla direttamente `order`, `match`, `multi` o `writing`; quelle attività sono soggette a controlli di dominio e revisione semantica.

### Revisione semantica

- `catena`: corretta una possibile ambiguità nella quarta conseguenza, chiarendo che il problema degli approvvigionamenti viene prima del percorso alternativo.
- `legami`: richiamo sintetico, non semplice copia dei testi delle card.
- `effetti`: i due distrattori sono azioni di gestione del ponte anziché conseguenze già avvenute nella quotidianità.
- `sguardo`: le alternative confondono cambio di prospettiva con passato/futuro e problema/soluzione.
- `trasferimento`: le alternative riprendono due errori interpretativi ricorrenti: separare affetti/ruolo pubblico o immaginare la vita moderna indipendente dal mondo sociale.
- `scrittura`: senza correzione automatica, per evitare di misurare come «competenza» il semplice uso di parole obbligate.

### Stato QA e limiti

**Controlli strutturali del campione: superati.** I test del motore e della UI sono gestiti in CI nella PR. La verifica didattica resta **da rivedere sul campo** per tempi, comprensione delle consegne, ambiguità residue e accessibilità su uno smartphone reale. La prova non produce certificazioni di competenza.

Per ogni modifica futura alle domande ripetere sia audit automatico (con contenuti normalizzati) sia controllo semantico: modificare una risposta «per pareggiare la lunghezza» non è un motivo valido se la rende meno corretta.
