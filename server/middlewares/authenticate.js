//authenticate.js - Questo middleware serve per autenticare le richieste al backend
//                  Ovvero avere la sicurezza che è il client che esegue la richiesta
//                  e non un utente malevolo.

const passport = require('passport')

// Config
const {
  bearer
} = require('../lib/passport')

passport.use('bearer', bearer)

// Creo il middleware authenticate, che autenticherà le richieste al backend
const authenticate = (req, res, next) => passport.authenticate('bearer', {
  session: false,
  failureFlash: true
}, (err, user, info) => {
  // Se si verifica un errore fatale
  if (err) {
    return res.status(500).json({
      message: 'Impossibile effettuare l\'autenticazione.'
    })
  }

  // Errore nell'autenticazione
  if (!user) {
    req.user = false
    return res.status(401).json({
      message: info
    })
  }

  /* Autenticazione effettuata, viene impostato req.user con le informazioni sull'utente autenticato che
  esegue la richiesta.
  */
  req.user = user
  next()
})(req, res, next)

module.exports = {
  authenticate
}
