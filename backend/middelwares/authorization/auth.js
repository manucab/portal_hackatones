// Variables && instances
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getAdminDB, getOrganizerDB, getIsAdminIsUserDB } = require('../../db/adminRoot/db_Select');
const { getUserDB } = require('../../db/select');
const { loginValidator } = require('../../validators/validateLogin');
const { emailValidator } = require('../../validators/val_email');
const { logger } = require("../../app/config/logger");


const isAuthenticated = async(req, res, next) => {

    let msgInfo = 'Authorization failure, no token';

    // Store the token of postman
    const { authorization } = req.headers;
    try {

        if (!authorization) {
            // Authorization failure, redirect login page
            logger.info(msgInfo);
            return res.status(401).json({ info: msgInfo });
        } else if (authorization) {

            // 1. Check the token, decode token and search user with email of token
            const decodedToken = jwt.verify(authorization, process.env.SECRET);

            // 2. Search in database
            const user = await getIsAdminIsUserDB(decodedToken.email);

            // if not user --> failed
            if (!user) {
                msgInfo = 'Not exist user in db';
                return res.status(401).json({ info: msgInfo });
            }

            req.auth = decodedToken;

            next();

        }

    } catch (e) {

        let msgError = ('Error in authorization:', e.message);
        logger.error(msgError);
        res.status(401).json({ info: msgError });
        return;
    }
}

const isAdmin = async(req, res, next) => {

    const { email } = req.auth || req.body;

    let msgInfo = 'Not exist admin in db';

    try {

        // 1. Check email
        await emailValidator.validateAsync({ email });

        // 2. Search in database
        const user = await getAdminDB(email);

        // if not user --> failed
        if (!user) {
            return res.status(401).json({ info: msgInfo });
        }

        if (user.state) {
            msgInfo = 'Is admin and state ACTIVE';
            logger.info(msgInfo);
            next();
        }
    } catch (e) {

        let msgError = ('Error in auth isAdmin:', e.message);
        logger.error(msgError);
        return res.status(401).send(msgError);
    }


}

// Check if you are an organizer
const isOrganizer = async(req, res, next) => {

    const { email } = req.auth || req.body;

    try {

        // 1. Check email
        await emailValidator.validateAsync({ email });

        // 2. Search in database
        const user = await getOrganizerDB(email);

        // if not user --> failed
        if (!user) {
            msgInfo = 'Not exist user in db';
            return res.status(401).json({ info: msgInfo });
        }

        if (user.active_user) {
            msgInfo = 'Is organizer and state ACTIVE';
            logger.info(msgInfo);
            req.id = user.id;
            next();
        } else {
            msgInfo = "Is organizer but, he isn't ACTIVE";
            logger.info(msgInfo);
            res.status(401).json({ info: msgInfo });
        }

    } catch (e) {

        let msgError = ('Error in auth organizer:', e.message);
        logger.error(msgError);
        return res.status(401).send(msgError);
    }
}

// Check if exist that user
const isUser = async(req, res, next) => {

    let msgInfo = '';

    // 1. Get params
    const { email, password } = req.body || req.body;

    try {

        // 2. Check if the parameters are valid
        await loginValidator.validateAsync({ email, password });

        // 2. Search in database
        const user = await getUserDB(email);

        // if user exist-> faild
        if (user) {

            msgInfo = `The user with email ${email} already exists`;
            logger.info(msgInfo);
            return res.json(msgInfo);
        }

        logger.debug('The user not exist in db, he can register now');
        next();

    } catch (e) {

        let msgError = ('Error in auth user:', e.message);
        logger.error(msgError);
        return res.status(401).send(msgError);
    }

}



// Check if you are an organizer
const isRightUser = async(req, res, next) => {

    const { id } = req.auth || req.body;
    const {idUser} = req.params

    try {
        //Check if token user is the same as url user

        const rigthUser = id === parseInt(idUser)

        if (!rigthUser) {

            msgInfo = `Wrong user`;
            logger.info(msgInfo);
            return res.json(msgInfo);
        }

        next()
        
    } catch (e) {

        let msgError = ('Error in auth user:', e.message);
        logger.error(msgError);
        return res.status(401).send(msgError);
    }
}

module.exports = {

    isAdmin,
    isAuthenticated,
    isOrganizer,
    isUser,
    isRightUser
};