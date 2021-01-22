// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { newUser } = require('../controllers/post/postRegister');

// Middelware
const { isUser } = require('../middelwares/authorization/auth');


// **** POST *****
// Register new user in db
router.post('/', isUser, newUser);

module.exports = router;