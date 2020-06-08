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
  employee: {
    type: String,
    unique: true
  },
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
  },
  legals: {
    type: Boolean,
    required: true
  },
  newsletter: {
    type: Boolean,
    required: true
  }
})

// Sovrascrive la funzione toJSON ed elimina il campo "password" dalla risposta JSON
UserSchema.methods.toJSON = function () {
  const user = this
  return _.pick(user.toObject(), ['_id', 'firstname', 'lastname', 'email', 'birthday', 'telephone', 'gender', 'address', 'employee', 'tickets', 'wallet', 'legals', 'newsletter'])
}

// Genera un token per un determinato utente
UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const access = 'auth'
  return jwt.sign({
    _id: user._id.toHexString(), // Inseriamo nella sezione dati l'ID dell'utente
    access
  }, process.env.JWT_SECRET || 'jwtSecret', { expiresIn: '1d' }).toString() // Impostiamo una chiave segreta e la scadenza del token
}

UserSchema.methods.buyTicket = async function (price) {
  const user = this

  const balance = user.get('wallet.balance')
  await user.set('wallet.balance', balance - price)
  await user.save()
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
    const salt = await bcrypt.genSalt(10) // Genera un salt randomico da aggiungere alla password in chiaro.
    const hash = await bcrypt.hash(user.password, salt) // Genera un hash della password e del salt. Grazie al salta l'hash sarà sempre diverso.
    user.password = hash // Sostituisci la password in chiaro con l'hash generato.
    next()
  } catch (e) {
    throw new Error('Impossibile criptare la password.')
  }
})

/* Creo l'oggetto collezione utilizzando lo schema che ho definito in precedenza. */
const User = mongoose.model('User', UserSchema)

/* Esporto la collezione così da poterla utilizzare nel codice. */
module.exports = User
