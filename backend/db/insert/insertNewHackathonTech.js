require('dotenv').config();
const { performQuery } = require('../performQuery');


const insertNewHackathonTechDB = async(id_hackathon, id_tech) => {

    const query = 'insert into hackathon_tech (id_hackathon, id_tech) values (?,?)';

    const params = [id_hackathon, id_tech];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    insertNewHackathonTechDB
}