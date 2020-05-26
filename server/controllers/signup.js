const _ = require('lodash')

const User = require('../models/user')

const signup = async (req, res) => {
  const body = _.pick(req.body, ['firstname', 'lastname', 'email', 
                                 'password', 'password_confirm', 'address', 
                                 'birthday', 'gender', 'telephone', 'empoyee'])

  // Controllare che la password corrisponda a password_confirm
  if (body.password !== body.password_confirm) {
    return res.status(403).json({
      message: 'Le password non corrispondono.'
    })
  }

  try {
    const user = new User(req.body) // Crea un nuovo utente
    await user.save() // Salva l'utente nel database
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json({
      message: 'Impossibile creare l\'utente.'
    })
  }
}

module.exports = {
  signup
}
