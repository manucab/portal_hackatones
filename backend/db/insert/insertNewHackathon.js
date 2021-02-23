require('dotenv').config();
const { performQuery } = require('../performQuery');


const createHackathonDB = async(hackathon_name, hackathon_place, city, start_date, end_date, hackathon_status, hackathon_info, cover_picture, id_organizer, thematic) => {

    const query = 'insert into hackathon (hackathon_name,hackathon_place, city, start_date, end_date,hackathon_status, hackathon_info,cover_picture,id_organizer,thematic) values (?,?,?,?,?,?,?,?,?,?)';

   
    const params = [hackathon_name, hackathon_place, city, start_date, end_date, hackathon_status, hackathon_info, cover_picture, id_organizer, thematic.toString()];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    createHackathonDB
}