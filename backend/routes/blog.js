const express = require('express')
const router = express.Router()

const filterPosts = require('../controllers/get/filterPosts')

router.get('/:filter',filterPosts)

module.exports = router