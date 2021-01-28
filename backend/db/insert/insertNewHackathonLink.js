require('dotenv').config();
const { performQuery } = require('../performQuery');


const insertNewHackathonLinkDB = async(values, arg) => {

    const query = `insert into hackathon_link (id_hackathon, id_link) values ${arg}`;

    const params = [...values];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    insertNewHackathonLinkDB
}