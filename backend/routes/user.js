const express = require('express')
const router = express.Router()

const profileInfo = require('../controllers/get/profileInfo')
const updateProfile = require('../controllers/update/updateProfileInfo')
const deleteUser = require('../controllers/delete/deleteUser')

router.get('/:id',profileInfo.profileInfo)
router.put('/:id/update',updateProfile.updateProfileInfo)
router.put('/:id/delete',deleteUser.deleteUser)

module.exports = router