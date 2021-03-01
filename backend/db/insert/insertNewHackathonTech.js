require('dotenv').config();
const { performQuery } = require('../performQuery');


const insertNewHackathonTechDB = async(values, arg) => {

    const query = `insert into hackathon_tech (id_hackathon, id_tech) values ${arg}`;

    const params = [...values];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    insertNewHackathonTechDB
}