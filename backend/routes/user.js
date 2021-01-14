const express = require('express')
const router = express.Router()

const profileInfo = require('../controllers/get/profileInfo')
const updateProfile = require('../controllers/update/updateProfileInfo')

router.get('/:id',profileInfo.profileInfo)
router.put('/:id',updateProfile.updateProfileInfo)

module.exports = router