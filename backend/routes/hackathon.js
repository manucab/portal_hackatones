<<<<<<< HEAD
const express = require('express')
const router = express.Router()

const addComment = require('../controllers/post/addComment')
const deleteComment = require('../controllers/delete/deleteComment')
const modifyComment = require ('../controllers/update/modifyComment')

router.post('/:idHackathon/add-comment',addComment)
router.put('/:idHackathon/:idComment/modify-comment',modifyComment)
router.delete('/:idHackathon/:idComment/delete-comment',deleteComment)


module.exports = router
=======
// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { getHackathonByFilters } = require('../controllers/get/getHackathonByFilters');


// Middelware

// **** GET  *****
// Search hackathons by some filters
router.get('/search/filters', getHackathonByFilters);
// Search hackathon by id
router.get('/search/:id', getHackathonByFilters);

module.exports = router;
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
