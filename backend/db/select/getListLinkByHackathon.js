// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const getListLinkByHackathonDB = async(id, items) => {

    const query = `select hl.id_hackathon, l.url, l.web_name from link l left join hackathon_link hl on  l.id = hl.id_link  where hl.id_hackathon in (${items})`;

    const params = [...id];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { getListLinkByHackathonDB };