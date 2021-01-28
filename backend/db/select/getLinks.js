// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const getLinksDB = async(url, items) => {

    const query = `select * from link where url in (${items})`;

    const params = [...url];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { getLinksDB };