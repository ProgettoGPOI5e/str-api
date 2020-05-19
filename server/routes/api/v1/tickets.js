const express = require('express')
const router = express.Router()

const {
  getTickets,
  buyTickets
} = require('../../../controllers/tickets')

const {
  authenticate
} = require('../../../middlewares/authenticate')

router.get('/', getTickets)
router.post('/buy/:id', authenticate, buyTickets)

module.exports = router
