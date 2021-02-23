// Variables && instances
const express = require('express');
const router = express.Router();
const{hackathonStore, upload} = require('../middelwares/storageMulter/changeUpload');


// Controller
const {
  createHackathon
} = require('../controllers/post/postCreateHackathon');

// Middelware
const {
  isAuthenticated,
  isOrganizer
} = require('../middelwares/authorization/auth');

// **** POST *****
// Create a new hackathon
router.post('/', isAuthenticated, isOrganizer,  hackathonStore,  upload.single('cover_picture'),createHackathon);


module.exports = router;