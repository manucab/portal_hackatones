const express = require('express')
const router = express.Router()

const addComment = require('../controllers/post/addComment')
const deleteComment = require('../controllers/delete/deleteComment')
const modifyComment = require ('../controllers/update/modifyComment')

router.post('/:idHackathon/add-comment',addComment)
router.put('/:idHackathon/:idComment/modify-comment',modifyComment)
router.delete('/:idHackathon/:idComment/delete-comment',deleteComment)


module.exports = router