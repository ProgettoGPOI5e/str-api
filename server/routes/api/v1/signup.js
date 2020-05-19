const express = require('express')
const router = express.Router()

const {
  signup
} = require('../../../controllers/signup')

// Tutte le routes definite in questo file saranno di tipo /api/v1/signup/*
router.post('/', signup) // POST /api/v1/signup/

module.exports = router
