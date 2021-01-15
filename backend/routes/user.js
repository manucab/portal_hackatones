const express = require('express')
const router = express.Router()

const cancelHackathonBooking = require('../controllers/delete/cancelHackathonBooking')
const deleteUser = require('../controllers/delete/deleteUser')
const profileInfo = require('../controllers/get/profileInfo')
const updateProfile = require('../controllers/update/updateProfileInfo')


router.get('/:id',profileInfo.profileInfo)
router.put('/:id/update',updateProfile.updateProfileInfo)
router.put('/:id/delete',deleteUser.deleteUser)
router.put('/:idUser/:idHackathon/cancel', cancelHackathonBooking.cancelHackathonBooking)

module.exports = router