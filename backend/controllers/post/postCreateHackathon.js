// Variables && instances
require('dotenv').config();
const { fieldsHackathons } = require('../../validators/fieldsHackathon');
const { createHackathonDB } = require('../../db/Insert');

/* Create a new hackathon*/
const createHackathon = async(req, res) => {

    // 1. Get params
    const {
        place,
        city,
        start_date,
        end_date,
        id_organizer,
        hackathon_info,
        thematic
    } = req.body

    try {

        // 2. Check if the parameters are valid
        await fieldsHackathons.validateAsync({ place, start_date, end_date, id_organizer });

        // if the params are valid, then post into db the new hackathon
        await createHackathonDB(place, city, start_date, end_date, id_organizer, hackathon_info, thematic);

        console.log('Create new hackathon successfully');
        res.send('Create new hackathon successfully');

    } catch (e) {
        console.log('Error login', e);
        res.status(401).send();
    }
}

module.exports = {
    createHackathon
}