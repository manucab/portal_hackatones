// Variables && instances
require('dotenv').config();
const { fieldsHackathons } = require('../../validators/fieldsHackathon');
const { createHackathonDB } = require('../../db/Insert');

/* Create a new hackathon*/
const createHackathon = async(req, res) => {

    // 1. Get params
    const { place, city, start_date, end_date, hackathon_status, hackathon_info, tech, thematic, link, webName } = req.body

    const { id } = req.auth;

    console.log(req.auth)

    console.log('id user', id);

    console.log('webName :>> ', webName);

    // console.log('id_organizer :>> ', id_organizer);

    try {

        // 2. Check if the parameters are valid
        await fieldsHackathons.validateAsync({
            place,
            city,
            start_date,
            end_date,
            hackathon_status,
            hackathon_info,
            tech,
            thematic,
            link,
            webName
        });

        console.log('Validate fields ok!!');

        // if the params are valid, then post into db the new hackathon
        //   await createHackathonDB(place, city, start_date, end_date, hackathon_status, hackathon_info, tech, thematic, link, webName, id);

        console.log('Create new hackathon successfully');
        res.send('Create new hackathon successfully');

    } catch (e) {
        console.log('Error postCreateHackathon', e.message);
        res.status(401).send();
    }
}

module.exports = {
    createHackathon
}