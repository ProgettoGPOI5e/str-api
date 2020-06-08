const express = require('express')
const router = express.Router()

const {
  getNews,
  addNews,
  getLastNews
} = require('../../../controllers/news')

const {
  authenticate
} = require('../../../middlewares/authenticate')

const {
  admin
} = require('../../../middlewares/admin')

router.get('/', authenticate, admin, getNews)
router.post('/', authenticate, admin, addNews)
router.get('/last', authenticate, getLastNews)

module.exports = router
