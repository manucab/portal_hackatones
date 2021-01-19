// Variables && instances
const express = require('express');
const router = express.Router();

// Controllers
const {activeUser} = require('../controllers/update');

// Middelwares
const {isCodeUser} = require('../middelwares/validateAccount/isCodeUser');

// Get event
router.get('/validate/:code', isCodeUser,activeUser);


module.exports = router;
