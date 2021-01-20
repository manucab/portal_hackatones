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

        // 2. Check if the parameters are valid
        const validParams = await loginValidator.validateAsync({ email, password });

        if (!validParams) {
            console.log('Error in valid params');
            res.status(401).send();
            return;
        }

        // 2.1 Check that this user not exist in Database
        const userDB = await getUserDB(email);

        if (userDB) {
            console.log('A user with that name already exists');
            res.status(401).send();
            return;
        }

        // 3. Post new admin
        // Encrypt password
        const passwordEncrypt = await bcrypt.hash(password, 10);
        // Generate code for url validation
        const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });

        let result = await registerNewUser(email, name, surname, register_date, professional_profile, rol, passwordEncrypt,validationCode);

        result = (result === undefined) ? '[]' : result;

        // 4. Send email to confirm count
        await utils.sendConfirmationMail(email, `http://${process.env.PUBLIC_DOMAIN}/user/validate/${validationCode}`)

        console.log('Register new user sucessfull');
        res.send('Register new user sucessfull');
    } catch (e) {
        console.log('Error post new user db', 'e=>', e);
        res.status(500).send();
    }

}

module.exports = {
    newUser
}
