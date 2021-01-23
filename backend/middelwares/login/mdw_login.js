// Variables && instances
require('dotenv').config();
const { loginValidator } = require('../../validators/validateLogin');
const { getUserDB } = require('../../db/adminRoot/db_Select');
const bcrypt = require('bcrypt');

// Check if exist user and password is rigth
const isUserRight = async(req, res, next) => {

    // 1. Get params
    const { email, password } = req.body

    try {

        // 2. Check if the parameters are valid
        const validParams = await loginValidator.validateAsync({ email, password });

        if (!validParams) {
            console.log('Error in valid params');
            res.status(401).send('Error in valid params');
            return;
        }

        // 3. If are valid, check if they are in the database
        const user = await getUserDB(email);

        // Not user in database --> failed
        if (!user) {
            console.log('!user', user);
            res.status(401).send('User does not exist in the db');
            return;
        }

        // 4. Check password with bcrypt
        const db_password = user.user_password;
        const passwordIsvalid = await bcrypt.compare(password, db_password);

        // If not valid password --> failed
        if (!passwordIsvalid) {
            res.status(401).send('Wrong password');
            return;
        }

        req.rol = user.rol;
        req.state = user.active_user;
        req.id = user.id;

        next();

    } catch (e) {
        let msgError = e.message || 'Error in login';

        console.log(msgError);
        res.status(401).send(msgError);
        return;
    }
}


module.exports = {
    isUserRight
}