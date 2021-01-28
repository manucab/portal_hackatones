// Variables && instances
require('dotenv').config();
const { logger } = require("../../app/config/logger");
const { registerNewAdmin } = require('../../db/adminRoot/db_Insert');
const { getAdminDB } = require('../../db/adminRoot/db_Select');
const { loginValidator } = require('../../validators/validateLogin');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');

const newAdmin = async(req, res) => {

    // 1. Get params
    const { email, password, name } = req.body

    try {

        // 2. Check if the parameters are valid
        await loginValidator.validateAsync({ email, password });

        // 2.1 Check yhat this user not exist in Database
        const adminDB = await getAdminDB(email);

        if (adminDB.length > 0) {
            let msgInfo = 'A admin with that name already exists'
            logger.info(msgInfo);
            return res.status(500).json({ info: msgInfo });
        }

        // 3. Post new admin
        // Generate random string
        key_admin = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'ascii-printable' });
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, 10);

        await registerNewAdmin(name, email, passwordEncrypt, key_admin);

        logger.info('Register new Admin sucessfully');
        res.send('Register new Admin sucessfully');
    } catch (e) {
        let msgError = e.message || 'Error insert new admin';
        logger.error('Error insert new admin', msgError);
        res.status(500).send(msgError);
    }

}

module.exports = {
    newAdmin
}