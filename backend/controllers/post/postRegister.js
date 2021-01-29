// Variables && instances
require('dotenv').config();
const { registerNewUser } = require('../../db/adminRoot/db_Insert');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');
const utils = require('../../utils/utils');
const { performQuery } = require('../../db/performQuery');
const { logger } = require("../../app/config/logger");





const newUser = async(req, res) => {

    let query = '';
    let params = [];

    // 1. Get params
    const { email, name, surname, professional_profile, rol, password, profile_picture } = req.body;

    try {

        // 3. Post new admin
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, parseInt(process.env.PASSWORD_LEN));

        // Generate code for url validation
        const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });

        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        // Insert into db new user
        // TODO -- Check format date 
        let { insertId } = await registerNewUser(email.toLowerCase(), name.toLowerCase(), surname.toLowerCase(), professional_profile.toLowerCase(), rol.toLowerCase(), passwordEncrypt, validationCode, profile_picture);

        let link = `http://${process.env.PUBLIC_DOMAIN}/user/validate/${insertId}/${validationCode}`;

        // 4. Send email to confirm count
        await utils.sendConfirmationMail(email, link);

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info('Commit');

        let msgInfo = 'Register new user sucessfull';

        logger.debug(msgInfo);
        res.json(msgInfo);
    } catch (e) {

        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.info('Rollback query');

        let msgError = e.message || 'Error in postRegister';

        logger.debug('Error postRegister', 'e=>', msgError);
        res.status(500).send(msgError);
    }

}

module.exports = {
    newUser
}