const express = require('express')
const router = express.Router()

const {
  getNews,
  addNews
} = require('../../../controllers/news')

const {
  authenticate
} = require('../../../middlewares/authenticate')

const {
  admin
} = require('../../../middlewares/admin')

router.get('/', authenticate, admin, getNews)
router.post('/', authenticate, admin, addNews)

module.exports = router
