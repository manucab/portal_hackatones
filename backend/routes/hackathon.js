// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { getHackathonByFilters } = require('../controllers/get/getHackathonByFilters');


// Middelware

// **** GET  *****
// Search hackathons by some filters
router.get('/filters', getHackathonByFilters);
// Search hackathon by id
router.get('/:id', getHackathonByFilters);

module.exports = router;