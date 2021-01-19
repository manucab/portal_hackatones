// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const {register} = require('../controllers/post');

// Middelware

// **** POST *****
// Register with new user in db

router.post('/',isUser,register);

// # Falta, hacer el controlador del login


module.exports = router;
