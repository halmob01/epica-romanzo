# Storie e simulatore di scelte — Epica e romanzo

**Stato:** progetto narrativo e pedagogico da implementare. Documento di progettazione, non applicazione funzionante.
**Riferimenti:** testo del docente «L'epica: le vite che rappresentano un mondo», presentazione di 12 slide e identità visiva/interazione del prologo di `halmob01/sito-feudo`.

## Scopo

Non ripetere l'introduzione «Chi merita una storia?», già svolta. Far **vivere** il rapporto fra decisione personale, ruolo sociale e destino comune. Poi confrontare come l'epica e la narrazione moderna rappresentano quel rapporto. L'obiettivo di lungo termine è preparare l'accesso alla «filosofia implicita» del romanzo secondo Guido Mazzoni, senza presentare un'opposizione assoluta e antistorica fra epica collettiva e romanzo individuale.

La domanda fissa dell'unità: «Quando il protagonista agisce, **che cosa cambia per lui e che cosa cambia per gli altri?**». La seconda domanda, più importante: «**Che ruolo o valore collettivo si vede attraverso di lui?**».

## Le storie (priorità di realizzazione)

| Fase | Storia | Forma | Scoperta |
| --- | --- | --- | --- |
| 1 — priorità | **Ettore: una città sulle spalle** | Simulazione principale, card SVG e 4 turni | Il padre, il marito e il difensore di Troia sono la stessa persona; il suo ruolo pubblico attraversa gli affetti privati |
| 1 | **Achille e Patroclo: l'offesa diventa guerra** | Breve storia a bivi, nessi causa-effetto | L'onore riconosciuto dagli altri e l'amicizia cambiano la sorte dell'esercito |
| 1 | **Penelope e Ulisse: tenere insieme Itaca** | Breve simulazione delle attese, ritorno guidato | La casa e il regno sono un ordine comune che alcuni difendono e altri cercano di recuperare |
| 2 — dopo la prima lezione | **Un paese di oggi: l'officina chiude** | Seconda simulazione autonoma, non un quiz | La sorte comune esiste anche oggi, ma un personaggio può viverla come problema della propria biografia e del proprio futuro |
| Finale | **Due modi di raccontare un destino comune** | Confronto fra scene, mappa di scelte, riflessione | Le forme narrative costruiscono una diversa visione del rapporto individuo/mondo |

Ettore deve ricevere più tempo e più dettaglio delle altre storie. Per la prima lezione è sufficiente portare a compimento Ettore, le sintesi brevi degli altri eroi e una domanda finale di confronto. Il capitolo sulla contemporaneità si prepara come espansione sostanziale, non come semplicistica slide finale.

## Regola: trama di Omero ≠ simulazione ipotetica

Le **card narrative** presentano gli eventi dell'Iliade/Odissea secondo i testi di partenza del docente e, quando necessario, con sintesi contestuale dichiarata. Le **scelte del giocatore** modellano situazioni didattiche plausibili ma inventate: sono un esperimento «che cosa accadrebbe se...?». Non attribuire queste decisioni o i loro esiti a Omero.

Gli indicatori sono **strumenti di simulazione, non misurazioni storiche**. Non esiste un numero di difesa di Troia nell'Iliade. La sorte finale di Troia non diventa una partita vincibile: l'obiettivo è comprendere la rete dei doveri e delle conseguenze; i punteggi di città non sono «voti».

## Ettore: esperienza completa (prima implementazione)

### Prologo illustrato: 5 card prima di ogni interazione

1. **Troia è sotto assedio** — «Da molti anni i Greci combattono contro Troia. Dietro le mura vivono soldati, famiglie e bambini». SVG: mura, case, due schieramenti.
2. **Ettore difende la città** — «Ettore è un guerriero troiano. Le persone contano su di lui perché difende le mura». SVG: Ettore al cancello, città alle sue spalle.
3. **Ettore è anche un padre** — «A casa lo aspettano Andromaca e il piccolo Astianatte». SVG: famiglia; movimento lieve.
4. **La battaglia si avvicina** — «Per difendere Troia servono uomini, cibo e fiducia. Ma non si può avere tutto». SVG: magazzini, guardie e cittadini.
5. **Una scelta cambia molte vite** — «Ora sarai Ettore. Ogni scelta può aiutare qualcuno e rendere più difficile la vita a qualcun altro». SVG: Ettore visto fra famiglia e mura. Etichetta persistente «Simulazione: le scelte che farai non sono episodi di Omero».

Testi brevi, una sola informazione nuova per card. Almeno un pulsante «Rivedi storia» disponibile durante il gioco.

### Interfaccia come `sito-feudo`

- **Sinistra desktop / in alto mobile:** mappa SVG animata di Troia (mura, abitazioni, magazzino, famiglie, guardie); cambia in funzione degli eventi, senza modello 3D.
- **Tre misure della città, tutte inizialmente tra 0 e 100:** `Difesa` **65**, `Provviste` **60**, `Fiducia` **60**. Mostrare numero, barra e variazione (+/-) dopo la decisione.
- **Destra desktop / sotto su mobile:** carta dell'evento, due/tre scelte verosimili, pulsante «Conferma», conseguenza narrativa, spiegazione («Chi viene coinvolto?»).
- **Famiglia:** non è un indicatore punteggiato (ridurre gli affetti a risorsa sarebbe fuorviante). Resta rappresentata da persone e racconti.
- I cambi di indicatori rappresentano tensioni e compromessi; **non devono esserci scelte sempre dominanti**. Non serve ottenere 100/100 per superare la lezione.
- Su mobile pulsanti grandi, layout leggibile, supporto `prefers-reduced-motion`, navigazione da tastiera.

### Turni simulati: eventi e scelte

I delta sono **proposte da bilanciare in prova**, non statistiche di Omero. Dopo ciascuna decisione il normale proseguire dell'assedio può consumare -3 Difesa e -4 Provviste; mostrare il motivo dell'erosione. Usare `clamp(0,100)`.

**Turno 1 — I magazzini**

La città è sotto assedio. Alcune famiglie chiedono più pane. Anche i soldati hanno bisogno di mangiare.

- A. **Apri il magazzino alle famiglie** → Provviste -15; Fiducia +12. Feedback: le famiglie mangiano; restano meno scorte per i giorni successivi.
- B. **Riservi più cibo ai soldati** → Difesa +8; Fiducia -10. Feedback: i soldati sono più pronti, ma alcune famiglie si sentono abbandonate.
- C. **Riduci le razioni di tutti** → Provviste +8 (cibo risparmiato); Difesa -5; Fiducia -6. Feedback: le scorte durano di più, ma la fame rende la città più debole.

**Turno 2 — Il pericolo alle mura**

Le sentinelle avvistano un attacco. Ettore deve decidere come usare le poche persone disponibili.

- A. **Rinforzi il portone** → Difesa +13; Provviste -8. Feedback: servono uomini e materiali; il portone è più protetto.
- B. **Metti al sicuro le famiglie** → Difesa -7; Fiducia +13; Provviste -5. Feedback: molte persone trovano riparo, ma ci sono meno uomini alle mura.
- C. **Chiedi ai cittadini di aiutare le guardie** → Difesa +7; Fiducia -8. Feedback: le mura hanno più difensori; alcuni cittadini hanno paura e protestano.

**Turno 3 — La notte**

La città non dorme. Un messaggero chiede a Ettore di scegliere dove mandare i rinforzi.

- A. **Proteggi le case vicine alle mura** → Difesa -6; Fiducia +10; Provviste -5. Feedback: metti al sicuro persone esposte, mentre un tratto di mura riceve meno rinforzi.
- B. **Concentri tutti al cancello** → Difesa +10; Fiducia -8. Feedback: difendi il punto critico, ma altri quartieri rimangono scoperti.
- C. **Dividi le guardie fra mura e case** → Difesa +3; Fiducia +3; Provviste -9. Feedback: distribuisci la protezione, ma il lavoro consuma risorse.

**Turno 4 — L'incontro con Andromaca (scena canonica, NON un bivio che riscrive Omero)**

Card narrate, in sequenza: Andromaca teme per Ettore e Astianatte; Ettore sa del pericolo per Troia; il bambino teme l'elmo; Ettore lo toglie e prende il figlio in braccio; Ettore ritorna in battaglia.

**Interazione interpretativa** anziché controfattuale:
- Tocca «Marito», «Padre», «Difensore» per mostrare, rispettivamente, Andromaca, Astianatte, Troia e le conseguenze intrecciate.
- Evidenzia su una mappa la **stessa** decisione «Tornare a combattere», con tre linee diverse (famiglia, figlio, città). Domanda: «Perché Ettore sente di dover combattere, anche se ama la sua famiglia?».
- Rendere possibile confrontare come si sarebbe trasformato lo stato della città con altre scelte simulate **prima dell'incontro**. Non fingere che nell'Iliade Ettore abbia scelto alternative non scritte.

### Finale del capitolo Ettore

Mostrare le misure finali come **fotografia della simulazione**. Non «Troia salvata» / «Troia persa». Breve riepilogo personalizzato: una decisione, un vantaggio, un costo, chi ne ha sentito gli effetti.

Conclusione fissa da scoprire: «Ettore non è padre *oppure* difensore: difendere la sua città significa anche tentare di proteggere la famiglia. Ma questi doveri possono fargli vivere un conflitto». A seguire un esercizio di trasferimento su un altro episodio.

## Seconda storia: Achille e Patroclo (più breve)

**Card narrative:** Agamennone sottrae Briseide ad Achille; Achille lo vive come offesa al proprio onore; si ritira; i Greci perdono terreno; Patroclo veste l'armatura; Ettore uccide Patroclo; Achille torna in battaglia.

**Simulazione a bivi dichiaratamente ipotetica:** «L'esercito soffre. Se fossi al posto di Achille, torneresti per i compagni, aspetteresti il riconoscimento di Agamennone o manderesti l'amico con l'armatura?». Mostrare l'effetto su `Forza dei Greci`, `Riconoscimento dell'onore`, `Rischio per i compagni`. Non presentare le strade alternative come eventi dell'Iliade. Chiudere sulla sequenza reale e sul rapporto fra **onore individuale** e **ordine dell'esercito**.

Non far leggere `Briseide` come un puro oggetto di gelosia romantica: nelle slide del docente l'offesa riguarda il riconoscimento pubblico della posizione di Achille.

## Terza storia: Penelope e Ulisse

**Card narrative:** Ulisse è lontano da Itaca; i Proci occupano la casa e pretendono che Penelope scelga un nuovo marito; Penelope tesse di giorno e disfa di notte; Telemaco cerca notizie; Ulisse torna per riprendere il suo posto.

**Piccola simulazione per Penelope:** far passare tre giornate di attesa mentre la pressione dei Proci aumenta. Indicatori: `Tempo guadagnato`, `Pressione dei Proci`, `Tenuta della casa`. Decisioni plausibili ma inventate per giocare (prendere tempo con richieste, cercare appoggio dei fedeli, proteggere Telemaco); mettere in primo piano che anche chi non combatte difende un **ordine comune**. La tessitura/disfatura appartiene invece al racconto omerico e va marcata come tale.

**Chiusura su Ulisse:** schema fisso «re, marito, padre»: il viaggio non è presentato come ricerca di un'identità completamente nuova ma come ritorno al posto occupato nel proprio mondo.

## Quarta storia: un destino collettivo oggi — espansione

**Storia inventata:** In una cittadina una grande officina chiude. Una giovane apprendista deve decidere se cercare un posto altrove, restare ad aiutare la famiglia o unirsi a colleghi e abitanti che provano a reagire. Gli effetti toccano il suo futuro, i rapporti affettivi e il quartiere.

Possibili indicatori: `Prospettive personali`, `Legami`, `Forza dell'azione comune`. **Nessuna scelta è moralmente superiore per definizione**: il gioco non deve insinuare che partire sia egoista o che restare sia sempre buono. Anche oggi esistono destini collettivi.

**Confronto finale guidato (Mazzoni):**
1. Ettore sente il destino di Troia come parte inseparabile del proprio posto nella città. Nella storia contemporanea, la protagonista può scegliere come prendere posizione rispetto a una vicenda generale.
2. Nell'epica, il protagonista incarna pubblicamente valori e ruoli della comunità; la narrazione moderna può concentrare l'attenzione sulla vita particolare, con progetti, esitazioni, condizioni sociali, conflitti.
3. La differenza è nel **modo di rappresentare** la relazione tra individuo e mondo, non nell'asserzione che nel presente non esistano obblighi, solidarietà o conseguenze pubbliche.

Non presentare questo capitolo come una parafrasi verificata di pagine specifiche dei saggi di Mazzoni: è una **rielaborazione didattica** orientata ai loro temi.

## Esperienza visiva e tecnica

Usare palette, font e formato delle card di `sito-feudo` e le sue illustrazioni SVG animate, adattando SOLO la parte prologo e stile; nuova mappa SVG di Troia che risponde alle scelte. HTML/CSS/JS statici per GitHub Pages; nessun server necessario. Dati di storia (`story`, `turns`, `choices`, `effects`, `feedback`, `conclusion`) separati dal motore delle barre e dalla vista.

**Fasi di lavoro:**
1. Prologo SVG e simulatore Ettore con tre indicatori, tre turni e incontro con Andromaca: percorso completo; verifica dei nessi causa-effetto.
2. Achille/Patroclo e Penelope/Ulisse (forme differenziate, non copie cosmetiche di Ettore).
3. Confronto contemporaneo e attività filosofica conclusiva.
4. Prova su telefoni reali, contrasto, leggibilità, regressione, reset dello stato, esiti alternativi e coerenza fra trama e simulazione.

**Controlli didattici:** non premiare la sola conservazione delle risorse; ogni scelta deve avere una ragione e un costo. Dopo ogni turno lo studente deve poter rispondere a «A chi è servita la scelta? Chi ne ha pagato il prezzo?». In verifica non ripetere le stesse formule delle risposte guidate. Per le scelte multiple evitare indizi di posizione o lunghezza.
