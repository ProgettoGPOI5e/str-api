const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const _ = require('lodash')

const {
  ObjectId
} = mongoose.Schema

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  postalcode: {
    type: String,
    required: true
  }
})

/* Definisco la struttura della mia collezione (ovvero la tabella). */
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
  birthday: {
    type: Date,
    required: true
  },
  telephone: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  address: AddressSchema,
  empoyee: {
    type: String
  },
  tickets: [{
    title: {
      type: ObjectId,
      ref: 'Ticket'
    },
    date: String
  }],
  wallet: {
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    currency: {
      type: String,
      required: true,
      default: 'EUR'
    }
  }
})

// Sovrascrive la funzione toJSON ed elimina il campo "password" dalla risposta JSON
UserSchema.methods.toJSON = function () {
  const user = this
  return _.pick(user.toObject(), ['_id', 'firstname', 'lastname', 
                                  'email', 'birthday', 
                                  'telephone', 'gender', 'address', 
                                  'employee', 'tickets', 'wallet'])
}

// Genera un token per un determinato utente
UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const access = 'auth'
  return jwt.sign({
    _id: user._id.toHexString(), // Inseriamo nella sezione dati l'ID dell'utente
    access                    // Impostiamo una chiave segreta e la scadenza del token
  }, process.env.JWT_SECRET || 'jwtSecret', { expiresIn: '1d' }).toString()
}

UserSchema.methods.buyTicket = async function ({ title, price }) {
  const user = this

  const ticket = {
    title
  }

  const balance = user.get('wallet.balance')
  await user.tickets.push(ticket)
  await user.set('wallet.balance', balance - price)
  await user.save()
  return ticket
}

/* Middleware che precede save e cripta la password quando viene creato un utente
 e quando viene modificata la password già esistente. */
UserSchema.pre('save', async function (next) {
  const user = this

  /* Se nella chiamata a user.save() non viene modificata la password,
  non viene effettuata alcuna modifica.
  */
  if (!user.isModified('password')) {
    return next()
  }

  try {
    // Genera un salt randomico da aggiungere alla password in chiaro.
    const salt = await bcrypt.genSalt(10)
    // Genera un hash della password e del salt. Grazie al salta l'hash sarà sempre diverso.
    const hash = await bcrypt.hash(user.password, salt) 
    // Sostituisci la password in chiaro con l'hash generato.
    user.password = hash 
    next()
  } catch (e) {
    throw new Error('Impossibile criptare la password.')
  }
})

/* Creo l'oggetto collezione utilizzando lo schema che ho definito in precedenza. */
const User = mongoose.model('User', UserSchema)

/* Esporto la collezione così da poterla utilizzare nel codice. */
module.exports = User
