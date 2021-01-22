// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { createHackathon } = require('../controllers/post/postCreateHackathon');

// Middelware
const { isAuthenticated, isAdmin, isOrganizer } = require('../middelwares/authorization/auth');

// **** POST *****
// Create a new hackathon
router.post('/', isAuthenticated, isAdmin || isOrganizer, createHackathon);


module.exports = router;