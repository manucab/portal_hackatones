const express = require('express')
const router = express.Router()

const cancelHackathonBooking = require('../controllers/delete/cancelHackathonBooking')
const deleteHackathon = require('../controllers/delete/deleteHakathon')
const deleteUser = require('../controllers/delete/deleteUser')
const modifyHackathon = require('../controllers/update/modifyHackathon')
const profileInfo = require('../controllers/get/profileInfo')
const rateHackathon = require('../controllers/update/rateHackathon')
const updateProfile = require('../controllers/update/updateProfileInfo')


router.get('/:id',profileInfo)
router.put('/:id/update',updateProfile)
router.put('/:id/delete',deleteUser)
router.put('/:idUser/:idHackathon/cancelbooking', cancelHackathonBooking)
router.put('/:idUser/:idHackathon/rate', rateHackathon)
router.patch('/:idUser/:idHackathon/modify', modifyHackathon)
router.put('/:idUser/:idHackathon/delete',deleteHackathon)



module.exports = router