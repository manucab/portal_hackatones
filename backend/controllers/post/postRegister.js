// Variables && instances
require('dotenv').config();
const { registerNewUser } = require('../../db/adminRoot/db_Insert');
const { getUserDB } = require('../../db/adminRoot/db_Select');
const { loginValidator } = require('../../validators/validateLogin');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');
const utils = require('../../utils/utils');

const newUser = async(req, res) => {

    // 1. Get params
    const { email, name, surname, register_date, professional_profile, rol, password } = req.body

    try {

        // 3. Post new admin
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, 10);
        // Generate code for url validation
        const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });

        // Insert into db new user
        let { insertId } = await registerNewUser(email, name, surname, register_date, professional_profile, rol, passwordEncrypt, validationCode);

        console.log('result', insertId);

        let link = `http://${process.env.PUBLIC_DOMAIN}/user/validate/${insertId}/${validationCode}`;


        console.log('link :>> ', link);

        // 4. Send email to confirm count
        await utils.sendConfirmationMail(email, link)

        console.log('Register new user sucessfull');
        res.send('Register new user sucessfull');
    } catch (e) {

        let msgError = e.message || 'Error in login';

        console.log(msgError);
        console.log('Error post new user db', 'e=>', e);
        res.status(500).send();
    }

}

module.exports = {
    newUser
}