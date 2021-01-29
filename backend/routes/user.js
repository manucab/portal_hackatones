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
const { isAuthenticated, isRightUser, isOrganizer } = require('../middelwares/authorization/auth');

// *** GET *** 
router.get('/:idUser',isAuthenticated,isRightUser, profileInfo)
    // *** PUT ***
router.put('/:idUser/update',isAuthenticated,isRightUser , updateProfile)
router.put('/forgotPassword', forgotPassword)
router.put('/:idUser/delete',isAuthenticated,isRightUser, deleteUser)
router.put('/:idUser/:idHackathon/cancelbooking',isAuthenticated,isRightUser , cancelHackathonBooking)
router.put('/:idUser/:idHackathon/rate',isAuthenticated,isRightUser ,isOrganizer, rateHackathon)
router.put('/:idUser/:idHackathon/modify',isAuthenticated,isRightUser ,isOrganizer, modifyHackathon)
router.put('/:idUser/:idHackathon/delete',isAuthenticated,isRightUser ,isOrganizer,deleteHackathon)

// *** POST ***
router.post('/validate/:id/:code', isCodeUser, activeUser);


module.exports = router