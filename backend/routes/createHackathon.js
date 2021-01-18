// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { createHackathon } = require('../controllers/post');


// Middelware
const { isAuthenticated, isAdmin } = require('../middelwares/authorization/auth');

// **** POST *****
// Create a new hack
router.post('/', isAuthenticated /*, isOrganizer || */ , isAdmin, createHackathon);


module.exports = router;