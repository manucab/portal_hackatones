// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const {getHackathonByFilters} = require('../controllers/get');


// Middelware

// **** GET  *****
// Search hackathons by some filters
router.get('/filters',getHackathonByFilters);

module.exports = router;
