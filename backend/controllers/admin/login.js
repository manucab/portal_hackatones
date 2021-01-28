// Variables && instances
require('dotenv').config();
const { logger } = require('../../app/config/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidator } = require('../../validators/validateLogin');
const { getAdminDB } = require('../../db/adminRoot/db_Select');


const login = async(req, res) => {

    // 1. Get params
    const { email, password } = req.body

    try {

        // 2. Check if the parameters are valid
        await loginValidator.validateAsync({ email, password });

        // 3. If are valid, check if they are in the database
        const user = await getAdminDB(email);

        logger.debug('user :>> ', user);

        logger.debug('user.password :>> ', user[0].password);

        // Not user in database --> failed
        if (user.length === 0) {
            logger.error('User not found', user);
            res.status(500).send('User not found');
            return;
        }

        // 4. Check password with bcrypt
        const db_password = user[0].password;
        const passwordIsvalid = await bcrypt.compare(password, db_password);

        // If not valid password --> failed
        if (!passwordIsvalid) {
            logger.info('Invalid password');
            res.status(401).send('Invalid password');
            return
        }

        // info to put inside the token
        const tokenPayload = {
            email: user[0].email,
            key_admin: user[0].key_admin,
            id_admin: user[0].id_admin
        }

        logger.debug(tokenPayload);

        // 5. Generate token, expire in two day
        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '2d'
        });

        res.json({ token });
        logger.debug('Login OK');
    } catch (e) {
        let msgError = e.message || 'Error in login, not authenticated';
        logger.error(msgError);
        res.status(401).send(msgError);
    }
}

module.exports = {
    login
}