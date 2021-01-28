// Variables && instances
const { updateStateUser } = require('../../db/adminRoot/db_update');
const { performQuery } = require('../../db/performQuery');
const { logger } = require("../../app/config/logger");

const activeUser = async(req, res) => {

    let query = '';
    let params = [];

    // 1. Get code params
    const { id } = req.params;

    try {

        // Init transaction mysql
        query = 'start transaction';
        const resInitTransaction = await performQuery(query, params);
        logger.info('Start transaction');

        // 2.1 change state to true and reset code
        await updateStateUser(parseInt(id));

        logger.debug('Update state is successfully');

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info('Commit');

        res.json({ info: 'Update state is successfully' });

    } catch (e) {

        // Rollback mysql
        query = 'rollback';
        await performQuery(query, params);
        logger.info('Rollback query');

        let msgError = ('Error in active user', e.message);
        logger.error(msgError);
        res.status(401).send(msgError);
        return;
    }

}

module.exports = {
    activeUser
};