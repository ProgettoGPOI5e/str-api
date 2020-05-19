const express = require('express')
const router = express.Router() // Importo il gestore delle routes

/*
Utilizzando un framework e avendo creato una Single Page Application,
le routes sul browser vengono gestite direttamente via JS.

Sul frontend utilizziamo il router di Vue che tramite le History API controlla la navigazione.
Se si ricaricasse la pagina o si navigasse su una route diversa dalla principale (/), verrebbe effettuata
la richiesta al server per quello specifico file (es. /contacts), ma essendo una SPA ed avendo un solo index.html
che gestisce tutto il rendering, questo file non verrebbe trovato e ciò causerebbe un errore 404.

Questo modulo esegue il redirect di qualsiasi directory diversa dalla principale (/) sull'index.html,
che gestirà in autonomia le routes.
*/
const history = require('connect-history-api-fallback')

// Leggo la variabile d'ambiente che indica se stiamo in sviluppo o in production
const env = process.env.NODE_ENV || 'development'

/*
Importo tutte le routes della versione V1 delle API. Questo è uno standard per la gestione delle REST API.
Se in una successiva versione dell'applicazione si volessero aggiungere degli API endpoint senza modificare
il comportamento di quelli vecchi e mantenere la compatibilità, mi bastrebbe creare
una directory V2 (/api/v2/*).
*/
const v1 = require('./api/v1')

// Impongo al server di deviare tutte le richieste /api/v1/* ad uno specifico router che definisco in un altro file.
router.use('/v1', v1)

/*
Il problema delle History API si verifica solo in production.
In questo caso history() è un middleware, ovvero una funzione che si interpone tra il server e le richieste.
*/
if (env === 'production') {
  router.use(history())
}

// Esporto il router che ho creato
module.exports = router
