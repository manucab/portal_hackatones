const express = require('express')
const router = express.Router()

const addPost = require('../controllers/post/addPost')
const deletePost = require('../controllers/delete/deletePost')
const filterPosts = require('../controllers/get/filterPosts')
const modifyPost = require('../controllers/update/modifyPost')

router.get('/:filter',filterPosts)
router.post('/add', addPost)
router.put('/:id/modify',modifyPost)
router.delete('/:id/delete',deletePost)

module.exports = router