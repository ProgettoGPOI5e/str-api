const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trasporti') // Connessione al DB "trasporti" che se non è presente viene creato

module.exports = mongoose
