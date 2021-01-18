const express = require('express')
const router = express.Router()

const cancelHackathonBooking = require('../controllers/delete/cancelHackathonBooking')
const deleteUser = require('../controllers/delete/deleteUser')
const modifyHackathon = require('../controllers/update/modifyHackathon')
const profileInfo = require('../controllers/get/profileInfo')
const rateHackathon = require('../controllers/update/rateHackathon')
const updateProfile = require('../controllers/update/updateProfileInfo')


router.get('/:id',profileInfo.profileInfo)
router.put('/:id/update',updateProfile.updateProfileInfo)
router.put('/:id/delete',deleteUser.deleteUser)
router.put('/:idUser/:idHackathon/cancel', cancelHackathonBooking.cancelHackathonBooking)
router.put('/:idUser/:idHackathon/rate', rateHackathon.rateHackathon)
router.patch('/:idUser/:idHackathon/modify', modifyHackathon.modifyHackathon)



module.exports = router