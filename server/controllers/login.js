const User = require('../models/user')
const bcrypt = require('bcryptjs')

// req è l'oggetto request, res è l'oggetto response. In questo caso estraggo direttamente le varabili email e password.
const login = async ({ body: { email, password } }, res) => {
  // Invio una risposta con status 200 (OK) e con un body in formato JSON.

  // Cerca l'utente in base all'email
  const user = await User.findOne({
    email
  })

  // Se l'email non è associata a nessun account invia un messaggi di errore
  if (!user) {
    return res.status(401).json({
      message: 'Non esiste alcun utente associato a questo indirizzo email.'
    })
  }

  try {
    await bcrypt.compare(password, user.password) // Confronto la password del login con l'hash salvato nel database.

    const token = await user.generateAuthToken() // Genera il token.
    res.status(200).json({
      token
    })
  } catch (e) {
    // Se le password non corrispondono invia un messaggio di errore
    return res.status(401).json({
      message: 'La password non è corretta.'
    })
  }

  // try {

  // } catch ({ message }) {
  //   res.status(500).json({
  //     message
  //   })
  // }
}

// Esporto tutte le richieste sotto la directory /api/v1/login.
module.exports = {
  login
}
