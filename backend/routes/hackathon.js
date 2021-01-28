const express = require('express')
const router = express.Router()

const addComment = require('../controllers/post/addComment')
const modifyComment = require ('../controllers/update/modifyComment')

router.post('/:idHackathon/add-comment',addComment)
router.put('/:idHackathon/:idComment/modify-comment',modifyComment)


module.exports = router