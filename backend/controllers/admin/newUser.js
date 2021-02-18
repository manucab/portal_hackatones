// Variables && instances
require('dotenv').config();
const { registerNewUser } = require('../../db/adminRoot/db_Insert');
const { getUserDB } = require('../../db/adminRoot/db_Select');
const { loginValidator } = require('../../validators/validateLogin');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');
const utils = require('../../utils/utils');
const { logger } = require('../../app/config/logger');

const newUser = async(req, res) => {

    // 1. Get params
    const { email, name, surname, register_date, professional_profile, rol, password } = req.body

    try {

        // 2. Check if the parameters are valid
        await loginValidator.validateAsync({ email, password });

        // 2.1 Check that this user not exist in Database
        const userDB = await getUserDB(email);

        if (userDB) {
            let msgInfo = 'A user with that name already exists';
            logger.info(msgInfo);
            return res.status(500).json({ info: msgInfo });
        }

        // 3. Post new admin
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, 10);
        // Generate code for url validation
        const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });

        await registerNewUser(email, name, surname, register_date, professional_profile, rol, passwordEncrypt, validationCode);

        // 4. Send email to confirm count
        await utils.sendConfirmationMail(email, `http://${process.env.PUBLIC_DOMAIN}/user/validate/${validationCode}`);

        logger.info('Register new user sucessfull');
        res.send('Register new user sucessfull');
    } catch (e) {
        let msgError = e.message || 'Error insert new user';
        logger.error('Error insert new user', msgError);
        res.status(500).send(msgError);
    }
}

module.exports = {
    newUser
}