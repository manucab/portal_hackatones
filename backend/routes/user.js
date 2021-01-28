// Variables && instances
const express = require('express')
const router = express.Router()

// Controllers
const { activeUser } = require('../controllers/update/updateActiveUser');
const cancelHackathonBooking = require('../controllers/delete/cancelHackathonBooking')
const deleteHackathon = require('../controllers/delete/deleteHakathon')
const deleteUser = require('../controllers/delete/deleteUser')
const forgotPassword = require('../controllers/update/forgotPassword')
const modifyHackathon = require('../controllers/update/modifyHackathon')
const profileInfo = require('../controllers/get/profileInfo')
const rateHackathon = require('../controllers/update/rateHackathon')
const updateProfile = require('../controllers/update/updateProfileInfo')

// Middelwares
const { isCodeUser } = require('../middelwares/validateAccount/isCodeUser');

// *** GET *** 
router.get('/:id', profileInfo)
    // *** PUT ***
router.put('/:id/update', updateProfile)
router.put('/forgotPassword', forgotPassword)
router.put('/:id/delete', deleteUser)
router.put('/:idUser/:idHackathon/cancelbooking', cancelHackathonBooking)
router.put('/:idUser/:idHackathon/rate', rateHackathon)
router.put('/:idUser/:idHackathon/modify', modifyHackathon)
router.put('/:idUser/:idHackathon/delete', deleteHackathon)

// *** POST ***
router.post('/validate/:id/:code', isCodeUser, activeUser);


module.exports = router