// Variables && instances
require('dotenv').config();
const {logger} = require("../../app/config/logger");
const {getHackathonInfoDB} = require('../../db/select');

const {performQuery} = require('../../db/performQuery');
const {filterHackathons} = require('../../validators/val_filterHackathon');

const getHackathonByFilters = async (req, res) => {

    let msgResponse = [];
    let query = '';
    let params = [];

    // 1. Get parameters of req.query
    const {
        hackathon_place,
        city,
        start_date,
        end_date,
        thematic,
        tech
    } = req.query;


    console.log('req.body :>> ',         hackathon_place,
    city,
    start_date,
    end_date,
    thematic,
    tech);

    const {id} = req.params;

    try { // 1.0 Check the parameters are valid?
        await filterHackathons.validateAsync({
            hackathon_place,
            city,
            start_date,
            end_date,
            tech,
            thematic
        });


        console.log('start_date :>> ', start_date);
console.log('tech :>> ', tech);

        // Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        // 2. Search parameters -> {hackathon_place, city,start_date, end_date, technologies,thematic }
        const listHackathons = await getHackathonInfoDB(id, hackathon_place, city, start_date, end_date, thematic,tech);

        msgResponse = listHackathons;

        if (! listHackathons || listHackathons.length<= 0) {
      msgResponse = {
        Info: 'No result found'
      };
    }

        // Commit mysql
    query = 'commit';
    await performQuery(query, params);
    logger.info('Commit');

    // 2. send result json
    res.json(msgResponse);

  } catch (e) {

    // Something wrong --> Rollback query = 'rollback';
        await performQuery(query, params);
        logger.error(query);

        let msgError =( 'Error get hackathon info:', e.message);
        logger.error(msgError);
        return res.status(500).json({info: msgError});
    }

}

module.exports = {
    getHackathonByFilters
}
