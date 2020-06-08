const express = require('express')
const router = express.Router()

const {
  getUser,
  getPurchases,
  getValidPurchases,
  getInvalidPurchases,
  getWallet
} = require('../../../controllers/users')

const {
  authenticate
} = require('../../../middlewares/authenticate')

/* Si interpone il middleware che autentica le richieste. Nel caso l'utente non sia autenticato,
la route non prosegue invocando getUser ma risponde con un errore al client.
*/
router.get('/:id', authenticate, getUser)
router.get('/:id/purchases', authenticate, getPurchases)
router.get('/:id/wallet', authenticate, getWallet)
router.get('/:id/purchases/valid', authenticate, getValidPurchases)
router.get('/:id/purchases/invalid', authenticate, getInvalidPurchases)

module.exports = router
