// Variables & instances
require('dotenv').config();
const { performQuery } = require('../db/performQuery');

// Get user
const getUserDB = async(email) => {

    const query = 'select * from competitor where email=?';

    const params = [email];

    const [result] = await performQuery(query, params);

    return result;
}

// Get hackaton info by some filters
const getHackathonInfoDB = async(id, hackathon_place, city, start_date, end_date, thematic) => {

    const query = `select * from hackathon where (id = ? or ? is null)
     and (hackathon_place = ? or ? is null )
     and (city = ? or ? is null)
     and (start_date >= ? or ?  is null)
     and (end_date <=? or ? is null)
      and (thematic = ? or ? is null)`;

    const params = [
        id,
        id,
        hackathon_place,
        hackathon_place,
        city,
        city,
        start_date,
        start_date,
        end_date,
        end_date,
        thematic,
        thematic
    ];

    const result = await performQuery(query, params);

    return result;

}

module.exports = {
    getUserDB,
    getHackathonInfoDB
}