// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { homePage } = require('../controllers/get/getHome');

// Middelware

// **** GET  *****
// Home page
router.get('/', homePage);

module.exports = router;