const express = require('express')
const router = express.Router()

const login = require('./v1/login')
const signup = require('./v1/signup')
const users = require('./v1/users')
const news = require('./v1/news')
const tickets = require('./v1/tickets')
const purchases = require('./v1/purchases')

// Qui definisco e utilizzo tutte le routes /api/v1/*
router.use('/login', login)
router.use('/signup', signup)
router.use('/users', users)
router.use('/news', news)
router.use('/tickets', tickets)
router.use('/purchases', purchases)

module.exports = router
