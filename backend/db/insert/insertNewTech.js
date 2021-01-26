// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const insertNewTechDB = async(tech) => {

    const query = 'insert into tech (tech_name) values (?)';

    const params = [tech];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { insertNewTechDB };