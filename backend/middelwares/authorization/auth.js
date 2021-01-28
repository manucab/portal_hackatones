// Variables && instances
require('dotenv').config();
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
const {getAdminDB, getCodeAdminqDB, getOrganizerDB} = require('../../db/adminRoot/db_Select');
const {resetAdminCode} = require('../../db/adminRoot/db_update');
const {getUserDB} = require('../../db/select');

const isAuthenticated = async (req, res, next) => {

  // Store the token of postman
  const {authorization} = req.headers;
  try {

    if (!authorization) {
      // Authorization failure, redirect login page
      console.log('Authorization failure, no token');
      res.redirect('/login');
    } else if (authorization) {

      // 1. Check the token, decode token and search user with email of token
      const decodedToken = jwt.verify(authorization, process.env.SECRET);

      // 2. Search in database
      const user = await getAdminDB(decodedToken.email);

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

const isAdmin = async (req, res, next) => {

  const {email} = req.auth;

  // 2. Search in database
  const user = await getAdminDB(email);

  // if not user --> failed
  if (!user) {
    res.status(401).send();
    return;
  }

  if (user[0].state) {
    console.log('Is admin and state ACTIVE');
    next();
  }
=======
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

>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d

}

// Check if you are an organizer
<<<<<<< HEAD
const isOrganizer = async (req, res, next) => {

  const {email} = req.auth;

  // 2. Search in database
  const user = await getOrganizerDB(email);

  // if not user --> failed
  if (!user) {
    res.status(401).send();
    return;
  }

  if (user[0].state) {
    console.log('Is organizer and state ACTIVE');
    next();
  } else {
    console.log('Is organizer but, he isnst ACTIVE');
    res.status(401).send('The organizer exists but its status is not activated');
  }

}

// Check if exist that user
const isUser = async (req, res, next) => {

  // 1. Obtein data email
  const {email} = req.body;

  console.log('email', email);
  try {

    // 2. Search in database
    const user = await getUserDB(email);

    // if user exist-> faild
    if (user) {
      console.log(`The user with email ${email} already exists`);
      return   res.redirect('/');
    }

    console.log('The user not exist in db, he can register now');
    next();

  } catch (e) {
    console.log('Error in auth isUser', e);
    res.status(401).send();
    return;
  }
=======
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
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d

}

module.exports = {
<<<<<<< HEAD
  isAdmin,
  isAuthenticated,
  isOrganizer,
  isUser
};
=======
    isAdmin,
    isAuthenticated,
    isOrganizer,
    isUser
};
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
