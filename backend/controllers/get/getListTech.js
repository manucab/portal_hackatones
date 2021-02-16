// Variables && instances
require('dotenv').config();
const {logger} = require("../../app/config/logger");
const {performQuery} = require('../../db/performQuery');
const {getListTechDB} = require('../../db/select/getListTech');


const getListTech = async (req, res) => {

    let query = '';
    let params = [];


    try { // Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        let listTechs = await getListTechDB();

        if (! listTechs) 
            throw new Error('No tech in db');
        
        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info(query);

   

        logger.debug(listTechs);
        res.json(listTechs);

    } catch (e) { // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.error(query);

        let msgError = ('Error get List of Techs info:', e.message);
        logger.error(msgError);
        return res.status(500).json({info: msgError});
    }

}

module.exports = {
    getListTech
}
