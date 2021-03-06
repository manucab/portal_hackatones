// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get lsit tech
const getListTechDB = async() => {

    const query = `select tech_name from tech`;

    const params = [];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { getListTechDB };