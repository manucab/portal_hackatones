const express = require('express')
const router = express.Router()
const isTokenOk = require('../middelwares/resetPassword/isTokenOk')

const forgotPassword = require('../controllers/update/forgotPassword')
const resetPassword = require('../controllers/update/resetPassword')

router.put('/',forgotPassword)
router.put('/reset-password/:token', isTokenOk,resetPassword)

module.exports = router