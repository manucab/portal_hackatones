// Variables && instances
require('dotenv').config();
const { loginValidator } = require('../../validators/validateLogin');
const { getUserDB } = require('../../db/adminRoot/db_Select');
const bcrypt = require('bcrypt');
const { logger } = require("../../app/config/logger");

// Check if exist user and password is rigth
const isUserRight = async(req, res, next) => {

    // 1. Get params
    const { email, password } = req.body

    let msgInfo = '';


    try {

        // 2. Check if the parameters are valid
        await loginValidator.validateAsync({ email, password });

        // 3. If are valid, check if they are in the database
        const user = await getUserDB(email);

        // Not user in database --> failed
        if (!user) {
            msgInfo = 'User does not exist in the db'
            logger.info(msgInfo);
            return res.status(401).json({ info: msgInfo });
        }

        // 4. Check password with bcrypt
        const db_password = user.user_password;
        const passwordIsvalid = await bcrypt.compare(password, db_password);

        // If not valid password --> failed
        if (!passwordIsvalid) {
            msgInfo = 'Wrong password'
            logger.info(msgInfo);
            return res.status(401).json({ info: msgInfo });
        }

        req.rol = user.rol;
        req.state = user.active_user;
        req.id = user.id;

        next();

    } catch (e) {
        let msgError = ('Error in login:', e.message);
        logger.error(msgError);
        return res.status(401).send(msgError);
    }
}


module.exports = {
    isUserRight
}