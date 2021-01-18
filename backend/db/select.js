// Variables & instances
require('dotenv').config();
const { performQuery } = require('../db/performQuery');

// Get user
const getUserDB = async(email) => {

    const query = 'select * from competitor where email=?';

    const params = [email];

    const [result] = await performQuery(query, params);

    return result;
}

module.exports = {
    getUserDB
}
