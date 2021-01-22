// Variables && instances
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidator } = require('../validators/validateLogin');
const { fieldsHackathons } = require('../validators/fieldsHackathon');
const { getUserDB } = require('../db/select');
const { createHackathonDB } = require('../db/Insert');

// Register
const register = async(req, res) => {

    // // 1. Get params
    // const {email, password} = req.body
    //
    // console.log('Email, password', email, password);
    //
    // try {
    //
    //   // 2. Check if the parameters are valid
    //   const validParams = await loginValidator.validateAsync({email, password});
    //
    //   if (!validParams) {
    //     console.log('Error in valid params');
    //     res.status(401).send();
    //     return
    //   }

}

module.exports = {
    register
}