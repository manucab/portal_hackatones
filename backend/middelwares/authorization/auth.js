// Variables && instances
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getAdminDB, getCodeAdminqDB } = require('../../db/adminRoot/db_Select');
const { resetAdminCode } = require('../../db/adminRoot/db_update');

const isAuthenticated = async(req, res, next) => {

    // Store the token of postman
    const { authorization } = req.headers;
    try {


        console.log('authorization :>> ', authorization);

        if (!authorization) {
            // Authorization failure, redirect login page
            console.log('Authorization failure, no token');
            res.redirect('/login');
        } else if (authorization) {

            // 1. Check the token, decode token and search user with email of token
            const decodedToken = jwt.verify(authorization, process.env.SECRET);

            console.log('decodedToken :>> ', decodedToken);

            // 2. Search in database
            const user = await getAdminDB(decodedToken.email);

            console.log('user :>> ', user);

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

    const { email } = req.auth;

    // 2. Search in database
    const user = await getAdminDB(email);


    console.log('user isAdmin:>> ', user);

    // if not user --> failed
    if (!user) {
        res.status(401).send();
        return;
    }


    console.log('user.state :>> ', user[0].state);


    if (user[0].state) {
        console.log('Is admin and state ACTIVE');
        next();
    }

}

module.exports = {
    isAdmin,
    isAuthenticated
};