// Variables && instances
const express = require('express');
const router = express.Router();

// Controllers
const { activeUser } = require('../controllers/update/updateActiveUser');

// Middelwares
const { isCodeUser } = require('../middelwares/validateAccount/isCodeUser');

// Get event
router.post('/validate/:id/:code', isCodeUser, activeUser);


module.exports = router;