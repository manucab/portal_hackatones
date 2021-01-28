require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const getListTechByHackathonDB = async(id, items) => {

    const query = `select ht.id_hackathon, t.tech_name from tech t left join hackathon_tech ht on  t.id = ht.id_tech  where ht.id_hackathon in (${items})`;

    const params = [...id];

    const result = await performQuery(query, params);

    return result;
}

module.exports = { getListTechByHackathonDB };