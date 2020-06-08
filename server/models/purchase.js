const mongoose = require('mongoose')

const {
  ObjectId
} = mongoose.Schema

const PurchaseSchema = new mongoose.Schema({
  ticket: {
    type: ObjectId,
    ref: 'Ticket'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  validity: {
    startDate: Date,
    endDate: Date
  }
})

const Purchase = mongoose.model('Purchase', PurchaseSchema)

module.exports = Purchase
