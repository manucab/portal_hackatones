const express = require('express')
const router = express.Router()

const profileInfo = require('../controllers/get/profileInfo')

router.get('/:id',profileInfo.profileInfo)

module.exports = router