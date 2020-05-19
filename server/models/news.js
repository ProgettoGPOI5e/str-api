const mongoose = require('mongoose')

const {
  ObjectId
} = mongoose.Schema

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
})

/* Creo l'oggetto collezione utilizzando lo schema che ho definito in precedenza. */
const News = mongoose.model('News', NewsSchema)

/* Esporto la collezione così da poterla utilizzare nel codice. */
module.exports = News
