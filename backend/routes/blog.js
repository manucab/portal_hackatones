const express = require('express')
const router = express.Router()

const addPost = require('../controllers/post/addPost')
const filterPosts = require('../controllers/get/filterPosts')

router.get('/:filter',filterPosts)
router.put('/insert', addPost)

module.exports = router