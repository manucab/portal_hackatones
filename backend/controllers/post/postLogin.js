// Variables && instances
require('dotenv').config();
const jwt = require('jsonwebtoken');
const utils = require('../../utils/utils');
const cryptoRandomString = require('crypto-random-string');
const { updateValidationCode } = require('../../db/update/db_updatevalidationCode');
const { performQuery } = require('../../db/performQuery');
const { logger } = require("../../app/config/logger");


const login = async(req, res) => {

    // 1. Get params
    const { email, password } = req.body
    const rol = req.rol;
    const state = req.state;
    const id = req.id;

    let query = '';
    let params = [];

    try {
        // 1.1 NO --> send email ACTIVE ACCOUNT
        if (state === 'true') {
            // info to put inside the token
            const tokenPayload = {
                email: email,
                rol: rol,
                id: id
            }

            // 5. Generate token, expire in 2 day
            const token = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '2d' });

            res.json({ token });
            logger.debug('Login OK');
        } else {

            // Generate code for url validation
            const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });

            //Start transaction mysql
            query = 'start transaction';
            await performQuery(query, params);
            logger.info('Init transaction query');

            // Save in db new validationCode
            let result = await updateValidationCode(validationCode, id);

            // 4. Send email to confirm count
            let link = `http://${process.env.PUBLIC_DOMAIN}/user/validate/${id}/${validationCode}`;
            await utils.sendConfirmationMail(email, link);

            // All correct --> commit
            query = 'commit';
            await performQuery(query, params);
            logger.info('Commit query');


            let msgInfo = 'Your account is not validated yet. We have sent you an email';

            logger.debug(msgInfo);
            res.json({ info: msgInfo });
        }


    } catch (e) {

        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.info('Rollback query');

        let msgError = e.message || 'Error in login';
        logger.error('Error login', msgError);
        res.status(401).send(msgError);
    }
}


module.exports = {
    login
}