require('dotenv').config();
const { performQuery } = require('../db/performQuery');


const createHackathonDB = async(place, city, start_date, end_date, id_organizer, hackathon_info) => {

    const query = 'insert into hackathon (hackathon_place, city, start_date, end_date, id_organizer, hackathon_info) values (?,?,?,?,?,?)';

    const params = [place, city, start_date, end_date, id_organizer, hackathon_info];

    const result = await performQuery(query, params);

    return result;
}



module.exports = {
createHackathonDB
}
