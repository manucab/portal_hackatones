const express = require('express')
const router = express.Router()

const addPost = require('../controllers/post/addPost')
const filterPosts = require('../controllers/get/filterPosts')
const modifyPost = require('../controllers/update/modifyPost')

router.get('/:filter',filterPosts)
router.post('/add', addPost)
router.put('/:id/modify',modifyPost)

module.exports = router