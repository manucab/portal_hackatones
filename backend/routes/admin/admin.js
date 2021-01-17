// Variables && instances
const express = require('express');
const router = express.Router();

// Controller
const { createInitAdmin } = require('../../controllers/admin/initRoot');
// Get
// const { getUser } = require('../../controllers/admin/get/getUser');
// const { getAdmin } = require('../../controllers/admin/get/getAdmin');
// const { getAllUsers } = require('../../controllers/admin/get/getAllUsers');
// const { getAllAdmins } = require('../../controllers/admin/get/getAllAdmins');
// // Login
const { login } = require('../../controllers/admin/login');
// // Post
const { newAdmin } = require('../../controllers/admin/newAdmin');
// const { newUser } = require('../../controllers/admin/post/newUser');


// Middelware
const { iskeyRoot } = require('../../middelwares/root/isKeyRoot');
const { isAuthenticated, isAdmin } = require('../../middelwares/authorization/auth');

// Routers
// ** GET **
// Get user
// router.get('/getUser', isAuthenticated, isAdmin, getUser);
// // Get all users
// router.get('/getAllUsers', isAuthenticated, isAdmin, getAllUsers);
// // Get admin
// router.get('/getAdmin', isAuthenticated, isAdmin, getAdmin);
// // Get all admins
// router.get('/getAllAdmins', isAuthenticated, isAdmin, getAllAdmins);


// ** POST **
// // Login admin
router.post('/login', login);
// Create a default admin 'root'
router.post('/init/:key', iskeyRoot, createInitAdmin);
// // Create admin
router.post('/newAdmin', isAuthenticated, isAdmin, newAdmin);
// // Create new user
// router.post('/newUser', isAuthenticated, isAdmin, newUser);

module.exports = router;