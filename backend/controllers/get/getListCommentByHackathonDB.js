// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const getListCommentByHackathonDB = async(id, items) => {

    const query = `select * from comment where comment.id_hackathon in (${items})`;

    const params = [...id];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { getListCommentByHackathonDB };