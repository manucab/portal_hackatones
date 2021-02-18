// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { getListTech } = require('../controllers/get/getListTech');
const { getListThematics } = require('../controllers/get/getListThematics');
const { getListSocialMedia } = require('../controllers/get/getListSocialMedia');


// Middelware

// **** GET  *****
// Get list of techs
router.get('/listTech', getListTech);
// Get list of thematics
router.get('/listThematics', getListThematics);
//get List of icons social media
router.get('/listSocialMedia', getListSocialMedia);

module.exports = router;