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
    let { hackathon_name, hackathon_place, city, start_date, end_date, hackathon_status, hackathon_info, techs, thematic, links } = req.body

    const id_organizer = req.auth.id;

    thematic = JSON.parse(thematic);
    tech = JSON.parse(techs);
    links = JSON.parse(links)


    // let cover_picture= '';

    let cover_picture= req.pathFile || '';

    console.log('cover_picture :>> ', cover_picture);


    let query = '';
    let params = [];

    console.log('hackathon_name :>> ', hackathon_name);
console.log('hackathon_place :>> ', hackathon_place);
console.log('city :>> ', city);
console.log('start_date :>> ', start_date);
console.log('end_date :>> ', end_date);
console.log('hackathon_status :>> ', hackathon_status);
console.log('hackathon_info :>> ', hackathon_info);
// console.log('cover_picture :>> ', cover_picture);
console.log('thematic :>> ', thematic);
console.log('techs :>> ', techs);
console.log('links :>> ', links);



    try {
        // TODO --> change techs
        // tech = techs;
        // 2. Check if the parameters are valid
          await fieldsHackathons.validateAsync({ hackathon_name, hackathon_place, city, start_date, end_date, hackathon_status, hackathon_info, cover_picture, tech, thematic, links });

        logger.debug('Validate fields ok!!');


        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');


        // 3. Insert in table hackathon
        const res_insertNewHackathon = await createHackathonDB(
            hackathon_name,
            hackathon_place,
            city,
            start_date, end_date,
            hackathon_status,
            hackathon_info,
            cover_picture,
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
        logger.info(query);

let msgInfo ='Create new hackathon successfully';

        logger.debug(msgInfo);
        res.send(msgInfo);

    } catch (e) {

        console.log(e);

        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.info(query);

        let msgError = ` Error in create new a hackathon: ${e.message} `;
        logger.error( msgError);
        res.status(500).json({info: msgError});
    }
}

module.exports = {
    createHackathon
}
