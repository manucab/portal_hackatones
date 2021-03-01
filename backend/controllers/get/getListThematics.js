// Variables && instances
require('dotenv').config();
const {logger} = require("../../app/config/logger");
const {performQuery} = require('../../db/performQuery');
const {getListThematicsDB} = require('../../db/select/getListThematics');

const getListThematics = async (req, res) => {

    let query = '';
    let params = [];


    try { // Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        let listThematics = await getListThematicsDB();

        if (!listThematics) listThematics = [];        

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info(query);

        //logger.debug(listThematics);
        res.json(listThematics);

    } catch (e) { // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.error(query);

        let msgError = ('Error get List of thematics info:', e.message);
        logger.error(msgError);
        return res.status(500).json({info: msgError});
    }

}

module.exports = {
    getListThematics
}
