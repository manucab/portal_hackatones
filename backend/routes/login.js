// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { login } = require('../controllers/post/postLogin');


// Middelware
// const { iskeyRoot } = require('../../middelwares/root/isKeyRoot');
// const { isAuthenticated, isAdmin } = require('../../middelwares/authorization/auth');

// **** POST *****
// Login admin

router.post('/', login
    /* login  (req, res) => {
    console.log('Login');
    res.send('Login'); 
}*/
);

// # Falta, hacer el controlador del login


module.exports = router;