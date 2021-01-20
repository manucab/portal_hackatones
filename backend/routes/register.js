// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const {newUser} = require('../controllers/admin/newUser');

// Middelware
const  {isUser} =  require('../middelwares/authorization/auth');


// **** POST *****
// Register new user in db
router.post('/',isUser,newUser);

module.exports = router;
