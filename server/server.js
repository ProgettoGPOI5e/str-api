require('./lib/mongoose') // Connessione a MongoDB

const express = require('express') // Importo Express, il server http.
const bodyParser = require('body-parser') // Importo body-parser, esegue il parsing della request e formatta il body della richiesta in req.body.
const cors = require('cors') // Import CORS, gestisce gli accessi al backend e consente il consumo delle API da parte del frontend.

const port = process.env.PORT || 3000 // Posso impostare la variabile d'ambiente PORT per indicare la porta d'ascolto del server. Altrimenti va in ascolto sulla 3000.

const app = express() // Inizializzo il server HTTP.

app.use(bodyParser.json()) // Esegue il parsing delle richieste in formato JSON.
app.use(bodyParser.urlencoded({ extended: true })) // Esegue il parsing delle richieste urlencoded.

// Import CORS
app.use(cors({
  origin: true,
  credentials: true,
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

// Impongo al server di deviare tutte le richieste /api/* ad uno specifico router che definisco in un altro file.
app.use('/api', require('./routes/api'))

// Cattura la richiesta di tipo GET sulla directory principale (/) e invia una risposta con stato 200 (OK) e con un body in JSON.
app.get('/', (req, res) => {
  res.status(200).json({
    title: 'STR',
    legal: 'This project is licensed under the MIT License.'
  })
})

// Il server HTTP viene messo in ascolto sulla porta specificata.
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}.`)
})
