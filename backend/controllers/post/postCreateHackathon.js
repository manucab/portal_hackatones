// Variables && instances
require('dotenv').config();
const { fieldsHackathons } = require('../../validators/fieldsHackathon');
const { createHackathonDB } = require('../../db/insert/insertNewHackathon');
const { performQuery } = require('../../db/performQuery');
const { auxInsertTech } = require('../post/auxInsertTech');

/* Create a new hackathon*/
const createHackathon = async(req, res) => {

    // 1. Get params
    const { place, city, start_date, end_date, hackathon_status, hackathon_info, tech, thematic, link, webName } = req.body

    const id_organizer = req.auth.id;

    let query = '';
    let params = [];

    try {

        // 2. Check if the parameters are valid
        await fieldsHackathons.validateAsync({ place, city, start_date, end_date, hackathon_status, hackathon_info, tech, thematic, link, webName });

        console.log('Validate fields ok!!');

        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        console.log('Init transaction query');

        // 3. Insert in table hackathon 
        const res_insertNewHackathon = await createHackathonDB(
            place.toLowerCase(),
            city.toLowerCase(),
            start_date, end_date,
            hackathon_status.toLowerCase(),
            hackathon_info,
            id_organizer,
            thematic.toLowerCase(),

        );
        // 3.1 Get id_hackathon
        let id_hackathon = res_insertNewHackathon.insertId;

        // Insert new tech and table hackathon_tech
        //    for (const t of tech) {
        await auxInsertTech(tech, id_hackathon);
        //   }


        console.log('Insert into table hackathon_tech OK!!');


        // ********* Part of link, a same of tech
        //   link.toLowerCase(),
        //   webName.toLowerCase(),

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        console.log('Commit');

        console.log('Create new hackathon successfully');
        res.send('Create new hackathon successfully');

    } catch (e) {

        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        console.log('Rollback query');

        console.log('Error postCreateHackathon', e);
        res.status(401).send();
    }
}

module.exports = {
    createHackathon
}