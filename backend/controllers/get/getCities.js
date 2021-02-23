// Variables && instances
require('dotenv').config();
const {logger} = require("../../app/config/logger");
const {performQuery} = require('../../db/performQuery');
const {getCitiesDB} = require('../../db/select/getCities');


const getCities = async (req, res) => {

    let query = '';
    let params = [];


    try { // Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        let listCities = await getCitiesDB();

        if (!listCities) 
            throw new Error('No cities in db');
        
        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info(query);

      //  logger.debug(listCities);
        res.json(listCities);

    } catch (e) { // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.error(query);

        let msgError = ('Error get cities of hackathons info:', e.message);
        logger.error(msgError);
        return res.status(500).json({info: msgError});
    }

}

module.exports = {
    getCities
}
