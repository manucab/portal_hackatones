// Variables && instances
require('dotenv').config();
const { val_register } = require('../../validators/val_register');

// Check if exist user and password is rigth
const isValidParamsRegister = async(req, res, next) => {

    // 1. Get params
    const { email, name, surname, professional_profile, rol, password } = req.body

    try {

        // 2. Check if the parameters are valid
        const validParams = await val_register.validateAsync({ email, name, surname, professional_profile, rol, password });

        next();

    } catch (e) {
        let msgError = e.message || 'Error in params register';

        console.log(msgError);
        res.status(401).send(msgError);
        return;
    }
}


module.exports = {
    isValidParamsRegister
}