// Variables && instances
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getAdminDB, getCodeAdminqDB, getOrganizerDB, getIsAdminIsUserDB } = require('../../db/adminRoot/db_Select');
const { resetAdminCode } = require('../../db/adminRoot/db_update');
const { getUserDB } = require('../../db/select');
const { loginValidator } = require('../../validators/validateLogin');

const isAuthenticated = async(req, res, next) => {

    // Store the token of postman
    const { authorization } = req.headers;
    try {

        if (!authorization) {
            // Authorization failure, redirect login page
            console.log('Authorization failure, no token');
            res.redirect('/login');
        } else if (authorization) {

            // 1. Check the token, decode token and search user with email of token
            const decodedToken = jwt.verify(authorization, process.env.SECRET);

            // 2. Search in database
            const user = await getIsAdminIsUserDB(decodedToken.email);

            // if not user --> failed
            if (!user) {
                res.status(401).send();
                return;
            }

            req.auth = decodedToken;
            next();

        }

    } catch (e) {
        res.status(401).send();
        console.log('error in authorization', e);
        return;

    }
}

const isAdmin = async(req, res, next) => {


    console.log('isAdmin');

    const { email } = req.auth;

    // 2. Search in database
    const user = await getAdminDB(email);

    console.log('user :>> ', user);


    // if not user --> failed
    if (!user) {
        res.status(401).send();
        return;
    }

    if (user.state) {
        console.log('Is admin and state ACTIVE');
        next();
    }

}

// Check if you are an organizer
const isOrganizer = async(req, res, next) => {

    console.log('isOrganizer');

    const { email } = req.auth;

    // 2. Search in database
    const user = await getOrganizerDB(email);

    // if not user --> failed
    if (!user) {
        res.status(401).send();
        return;
    }

    console.log('user :>> ', user);

    if (user.state) {
        console.log('Is organizer and state ACTIVE');
        next();
    } else {
        console.log('Is organizer but, he isnst ACTIVE');
        res.status(401).send('The organizer exists but its status is not activated');
    }

}

// Check if exist that user
const isUser = async(req, res, next) => {

    // 1. Get params
    const { email, password } = req.body


    try {

        // 2. Check if the parameters are valid
        await loginValidator.validateAsync({ email, password });

        // 2. Search in database
        const user = await getUserDB(email);

        // if user exist-> faild
        if (user) {
            console.log(`The user with email ${email} already exists`);
            return res.send(`The user with email ${email} already exists`);
        }

        console.log('The user not exist in db, he can register now');
        next();

    } catch (e) {
        let msgError = e.message || 'Error in login';

        console.log(msgError);
        console.log('Error in auth isUser', e);
        res.status(401).send();
        return;
    }

}

module.exports = {
    isAdmin,
    isAuthenticated,
    isOrganizer,
    isUser
};