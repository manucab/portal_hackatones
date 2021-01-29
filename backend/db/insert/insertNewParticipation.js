require('dotenv').config();
const { performQuery } = require('../performQuery');


const insertNewParticipation = async(id_competitor, id_hackathon, inscription_status,id_booking) => {

    const query = 'insert into competitor_hackathon (id_competitor, id_hackathon, inscription_status,id_booking) values (?,?,?,?)';

    const params = [id_competitor, id_hackathon, inscription_status,id_booking];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    insertNewParticipation
}
