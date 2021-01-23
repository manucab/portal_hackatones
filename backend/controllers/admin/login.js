// Variables && instances
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidator } = require('../../validators/validateLogin');
const { getAdminDB } = require('../../db/adminRoot/db_Select');


const login = async(req, res) => {

    // 1. Get params
    const { email, password } = req.body

    try {

        // 2. Check if the parameters are valid
        const validParams = await loginValidator.validateAsync({ email, password });

        // 3. If are valid, check if they are in the database
        const user = await getAdminDB(email);

        console.log('user :>> ', user);

        console.log('user.password :>> ', user[0].password);

        // Not user in database --> failed
        if (user.length === 0) {
            console.log('!user', user);
            res.status(401).send('User not found');
            return;
        }

        // 4. Check password with bcrypt
        const db_password = user[0].password;
        const passwordIsvalid = await bcrypt.compare(password, db_password);


        console.log('db_password :>> ', db_password);
        console.log('password :>> ', password);

        console.log(passwordIsvalid);

        // If not valid password --> failed
        if (!passwordIsvalid) {
            console.log('Invalid password');
            res.status(401).send()
            return
        }

        // info to put inside the token
        const tokenPayload = {
            email: user[0].email,
            key_admin: user[0].key_admin,
            id_admin: user[0].id_admin
        }

        console.log(tokenPayload);

        // 5. Generate token, expire in one day
        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });


        res.json({ token });
        console.log('Login OK');
    } catch (e) {
        let msgError = e.message || 'Error in login';

        console.log(msgError);
        console.log('Error login', e);
        res.status(401).send();
    }
}

module.exports = {
    login
}