// Variables && instances
require('dotenv').config();
const { registerNewUser } = require('../../db/adminRoot/db_Insert');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');
const utils = require('../../utils/utils');
const { performQuery } = require('../../db/performQuery');

let query = '';
let params = [];

const newUser = async(req, res) => {

    // 1. Get params
    const { email, name, surname, register_date, professional_profile, rol, password } = req.body;

    try {

        // 3. Post new admin
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, parseInt(process.env.PASSWORD_LEN));

        // Generate code for url validation
        const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });

        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        console.log('Init transaction query');

        // Insert into db new user
        // TODO -- Check format date 
        let { insertId } = await registerNewUser(email.toLowerCase(), name.toLowerCase(), surname.toLowerCase(), register_date, professional_profile.toLowerCase(), rol.toLowerCase(), passwordEncrypt, validationCode);

        let link = `http://${process.env.PUBLIC_DOMAIN}/user/validate/${insertId}/${validationCode}`;

        // 4. Send email to confirm count
        await utils.sendConfirmationMail(email, link);

        console.log('Register new user sucessfull');
        res.send('Register new user sucessfull');
    } catch (e) {

        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        console.log('Rollback query');

        let msgError = e.message || 'Error in postRegister';

        console.log('Error postRegister', 'e=>', msgError, e);
        res.status(500).send(msgError);
    }

}

module.exports = {
    newUser
}