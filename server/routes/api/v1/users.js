const express = require('express')
const router = express.Router()

const {
  getUser,
  getTickets,
  getWallet
} = require('../../../controllers/users')

const {
  authenticate
} = require('../../../middlewares/authenticate')

/* Si interpone il middleware che autentica le richieste. Nel caso l'utente non sia autenticato,
la route non prosegue invocando getUser ma risponde con un errore al client.
*/
router.get('/:id', authenticate, getUser) // GET /api/v1/users/:id
router.get('/:id/tickets', authenticate, getTickets) // GET /api/v1/users/:id
router.get('/:id/wallet', authenticate, getWallet) // GET /api/v1/users/:id

module.exports = router
