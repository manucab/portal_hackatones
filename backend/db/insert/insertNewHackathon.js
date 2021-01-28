require('dotenv').config();
const { performQuery } = require('../performQuery');


const createHackathonDB = async(place, city, start_date, end_date, hackathon_status, hackathon_info, id_organizer, thematic) => {

    const query = 'insert into hackathon (hackathon_place, city, start_date, end_date,hackathon_status, hackathon_info,id_organizer,thematic) values (?,?,?,?,?,?,?,?)';

    const params = [place, city, start_date, end_date, hackathon_status, hackathon_info, id_organizer, thematic];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    createHackathonDB
}