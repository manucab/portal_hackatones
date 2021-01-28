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