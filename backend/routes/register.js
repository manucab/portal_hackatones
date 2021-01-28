// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { newUser } = require('../controllers/post/postRegister');

// Middelware
const { isUser } = require('../middelwares/authorization/auth');
const { isValidParamsRegister } = require('../middelwares/register/mdw_register');


// **** POST *****
// Register new user in db
router.post('/', isValidParamsRegister, isUser, newUser);

module.exports = router;