// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const insertNewLinkDB = async(link, items) => {

    const query = `insert into link (url, web_name) values ${items}`;

    const params = [...link];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { insertNewLinkDB };