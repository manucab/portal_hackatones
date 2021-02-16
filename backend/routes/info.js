// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { getListTech } = require('../controllers/get/getListTech');
const { getListThematics } = require('../controllers/get/getListThematics');

// Middelware

// **** GET  *****
// Get list of techs
router.get('/listTech', getListTech);
// Get list of thematics
router.get('/listThematics', getListThematics);

module.exports = router;