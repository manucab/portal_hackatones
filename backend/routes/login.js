// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { login } = require('../controllers/post/postLogin');


// Middelware
const { isUserRight } = require('../middelwares/login/mdw_login');

// **** POST *****
// Login user
router.post('/', isUserRight, login);


module.exports = router;