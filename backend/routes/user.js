<<<<<<< HEAD
const express = require('express')
const router = express.Router()

const cancelHackathonBooking = require('../controllers/delete/cancelHackathonBooking')
const deleteHackathon = require('../controllers/delete/deleteHakathon')
const deleteUser = require('../controllers/delete/deleteUser')
const forgotPassword = require('../controllers/update/forgotPassword')
const modifyHackathon = require('../controllers/update/modifyHackathon')
const profileInfo = require('../controllers/get/profileInfo')
const rateHackathon = require('../controllers/update/rateHackathon')
const updateProfile = require('../controllers/update/updateProfileInfo')


router.get('/:id',profileInfo)
router.put('/:id/update',updateProfile)
router.put('/forgotPassword',forgotPassword)
router.put('/:id/delete',deleteUser)
router.put('/:idUser/:idHackathon/cancelbooking', cancelHackathonBooking)
router.put('/:idUser/:idHackathon/rate', rateHackathon)
router.put('/:idUser/:idHackathon/modify', modifyHackathon)
router.put('/:idUser/:idHackathon/delete',deleteHackathon)



module.exports = router
=======
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
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
