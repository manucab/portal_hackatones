const express = require('express')
const router = express.Router()

const addPost = require('../controllers/post/addPost')
const deletePost = require('../controllers/delete/deletePost')
const filterPosts = require('../controllers/get/filterPosts')
const modifyPost = require('../controllers/update/modifyPost')
const getAllPosts = require('../controllers/get/getAllPosts')
const getPostById = require('../controllers/get/getPostById')

router.get('/',getAllPosts)
router.get('/post/:id',getPostById)
router.get('/filter',filterPosts)
router.post('/add', addPost)
router.put('/:id/modify',modifyPost)
router.delete('/:id/delete',deletePost)

module.exports = router