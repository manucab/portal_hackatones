// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get list of thematics
const getListThematicsDB = async() => {

    const query = `select distinct(thematic) from hackathon`;

    const params = [];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { getListThematicsDB };