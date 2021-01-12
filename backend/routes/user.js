const express = require('express')
const router = express.Router()

const get = require('../controllers/get/showAll')
router.get('/',get.showAll)

module.exports = router