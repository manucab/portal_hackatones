// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get cities
const getCitiesDB = async() => {

    const query = `select distinct city from hackathon`;

    const params = [];

    const result = await performQuery(query, params);

    return result;
}
module.exports = { getCitiesDB };
