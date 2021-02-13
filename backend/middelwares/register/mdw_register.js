// Variables && instances
require('dotenv').config();
const { val_register } = require('../../validators/val_register');
const { logger } = require("../../app/config/logger");

// Check if exist user and password is rigth
const isValidParamsRegister = async(req, res, next) => {

    // 1. Get params
    const { email, name, surname, professionalProfile, rol, password, profilePicture } = req.body

    console.log(email, name, surname, professionalProfile, rol, password, profilePicture );

    try {

        // 2. Check if the parameters are valid
        await val_register.validateAsync({ email, name, surname, professionalProfile, rol, password, profilePicture });
        next();
    } catch (e) {

        let msgError = ('Error in params register:', e.message);
        logger.error(msgError);
        return res.status(500).send(msgError);
    }
}


module.exports = {
    isValidParamsRegister
}