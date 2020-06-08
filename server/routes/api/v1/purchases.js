const express = require('express')
const router = express.Router()

const {
  validatePurchase
} = require('../../../controllers/purchases')

const {
  authenticate
} = require('../../../middlewares/authenticate')

router.post('/:id/validate/', authenticate, validatePurchase)

module.exports = router
