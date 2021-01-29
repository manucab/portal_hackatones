// Variables && instances
require('dotenv').config();
const { logger } = require("../../app/config/logger");
const { getHackathonInfoDB } = require('../../db/select');
const { getListLinkByHackathonDB } = require('../../db/select/getListLinkByHackathon');
const { getListTechByHackathonDB } = require('../../db/select/getListTechByHackathon');
const { performQuery } = require('../../db/performQuery');
const { filterHackathons } = require('../../validators/val_filterHackathon');

const getHackathonByFilters = async(req, res) => {

    let msgResponse = [];
    let query = '';
    let params = [];

    // 1. Get parameters of req.query
    const { hackathon_place, city, start_date, end_date, thematic, tech } = req.query;

    const { id } = req.params;


    try {

        // 1.0 Check the parameters are valid?
        await filterHackathons.validateAsync({ hackathon_place, city, start_date, end_date, tech, thematic });

        // Fucntion for prepara string query mysql, amoung of values as ? or a pair (?,?)
        const getParams = (len, format) => Array(len).fill(`${format}`).join();

        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        //  2. Search parameters -> {hackathon_place, city,start_date, end_date, technologies,thematic }
        const listHackathons = await getHackathonInfoDB(id, hackathon_place, city, start_date, end_date, thematic);

        console.log('listHackathons :>> ', listHackathons);

        // Format data hackathon...
        hackathon.forEach(item => {
            msgResponse.push({
                hackathon_name: item.hackathon_name,
                hackathon_place: item.hackathon_place,
                city: item.city || 'not info',
                start_date: item.start_date,
                end_date: item.end_date,
                hackathon_status: item.hackathon_status || 'not info',
                hackathon_info: item.hackathon_info || 'not info',
                thematic: item.thematic,
                link: item.link || 'not info',
                tech: item.tech || 'not info',
                cover_picture: item.cover_picture || 'not info'
            });


        })

    }

    // Commit mysql
    query = 'commit';
    await performQuery(query, params);
    logger.info('Commit');

    // 2. send result json
    res.json(msgResponse);

} catch (e) {

    // Something wrong --> Rollback
    query = 'rollback';
    await performQuery(query, params);
    logger.error(query);

    let msgError = ('Error get hackathon info:', e.message);
    logger.error(msgError);
    return res.status(500).json({ info: msgError });
}


module.exports = {
    getHackathonByFilters
}