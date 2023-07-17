const express = require('express')
const router = express.Router()
const {login, sinup, signup } = require('../controllers/user')
router.post('/login', login)
router.post('/signup', signup)

module.exports = router