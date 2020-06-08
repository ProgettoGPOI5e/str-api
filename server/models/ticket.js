const mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    value: {
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
  validity: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true,
    trim: true
  }
})

/* Creo l'oggetto collezione utilizzando lo schema che ho definito in precedenza. */
const Ticket = mongoose.model('Ticket', TicketSchema)

/* Esporto la collezione così da poterla utilizzare nel codice. */
module.exports = Ticket
