// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { getHackathonByFilters } = require('../controllers/get/getHackathonByFilters');
const addComment = require('../controllers/post/addComment')
const deleteComment = require('../controllers/delete/deleteComment')
const modifyComment = require('../controllers/update/modifyComment')
const {enrollHackathon} = require('../controllers/post/enrrollHackathon');

// Middelware
const {  isAuthenticated,  isOrganizer} = require('../middelwares/authorization/auth');

// Sign up for a hackathon
router.post('/:id_hackathon/enroll', isAuthenticated, enrollHackathon);

router.post('/:idHackathon/add-comment', addComment)
router.put('/:idHackathon/:idComment/modify-comment', modifyComment)
router.delete('/:idHackathon/:idComment/delete-comment', deleteComment)

// **** GET  *****
// Search hackathons by some filters
router.get('/search/filters', getHackathonByFilters);
// Search hackathon by id
router.get('/search/:id', getHackathonByFilters);


module.exports = router
