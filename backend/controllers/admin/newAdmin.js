// Variables && instances
require('dotenv').config();
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
        const validParams = await loginValidator.validateAsync({ email, password });

        console.log('validParams :>> ', validParams);

        if (!validParams) {
            console.log('Error in valid params');
            res.status(401).send();
            return
        }


        // 2.1 Check yhat this user not exist in Database
        const adminDB = await getAdminDB(email);

        console.log('adminDB newUser :>> ', adminDB);

        if (adminDB.length > 0) {
            console.log('A admin with that name already exists');
            res.status(401).send();
            return;
        }

        // 3. Post new admin
        // Generate random string
        key_admin = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'ascii-printable' });
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, 10);

        let result = await registerNewAdmin(name, email, passwordEncrypt, key_admin);

        result = (result === undefined) ? '[]' : result;

        console.log('Register new Admin sucessfull');
        res.send('Register new Admin sucessfull');
    } catch (e) {
        console.log('Error post new admin db', 'e=>', e);
        res.status(500).send();
    }

}

module.exports = {
    newAdmin
}