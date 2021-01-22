// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { login } = require('../controllers/post/postLogin');


// Middelware
// const { iskeyRoot } = require('../../middelwares/root/isKeyRoot');
// const { isAuthenticated, isAdmin } = require('../../middelwares/authorization/auth');

// **** POST *****
// Login user
router.post('/', login);


module.exports = router;