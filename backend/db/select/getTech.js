// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const getTechDB = async(tech) => {

    const query = 'select * from tech where tech_name=?';

    const params = [tech];

    const [result] = await performQuery(query, params);

    return result;
}

module.exports = { getTechDB };