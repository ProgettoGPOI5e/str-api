const express = require('express')
const router = express.Router()

const { login } = require('../../../controllers/login')

// Definisco la directory /api/v1/login. La funzione login() (ovvero il controller) lo import da un altro file.
router.post('/', login) // POST /api/v1/login

module.exports = router
