// Variables && instances
require('dotenv').config();
const { fieldsHackathons } = require('../../validators/fieldsHackathon');
const { createHackathonDB } = require('../../db/insert/insertNewHackathon');
const { performQuery } = require('../../db/performQuery');
const { auxInsertTech } = require('../post/auxInsertTech');
const { auxInsertLink } = require('../post/auxInsertLink');
const { logger } = require("../../app/config/logger");

/* Create a new hackathon*/
const createHackathon = async(req, res) => {

    // 1. Get params
    const { place, city, start_date, end_date, hackathon_status, hackathon_info, tech, thematic, links } = req.body

    const id_organizer = req.auth.id;

    let query = '';
    let params = [];

    try {

        // 2. Check if the parameters are valid
        await fieldsHackathons.validateAsync({ place, city, start_date, end_date, hackathon_status, hackathon_info, tech, thematic, links /*, webName*/ });

        logger.debug('Validate fields ok!!');

        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        // 3. Insert in table hackathon 
        const res_insertNewHackathon = await createHackathonDB(
            place,
            city,
            start_date, end_date,
            hackathon_status,
            hackathon_info,
            id_organizer,
            thematic,
        );
        // 3.1 Get id_hackathon
        let id_hackathon = res_insertNewHackathon.insertId;

        // 4. Insert new tech and table hackathon_tech
        if (tech) await auxInsertTech(tech, id_hackathon);

        logger.debug('Insert into tables tech and hackathon_tech OK!!');

        // 5. Insert new links and table hackathon_link
        if (links) await auxInsertLink(links, id_hackathon);

        logger.debug('Insert into tables lin and hackathon_link OK!!');

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info('Commit');

        logger.debug('Create new hackathon successfully');
        res.send('Create new hackathon successfully');

    } catch (e) {

        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.info('Rollback query');

        let msgError = e.message || 'Error in create a new hackathon';
        logger.error('Error login', msgError);
        console.log('msgError :>> ', msgError, e);
        res.status(500).send(msgError);
    }
}

module.exports = {
    createHackathon
}