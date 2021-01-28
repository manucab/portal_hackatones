// Variables && instances
const { updateStateUser } = require('../../db/adminRoot/db_update');
const { performQuery } = require('../../db/performQuery');
const { logger } = require("../../app/config/logger");

const activeUser = async(req, res) => {

    let query = '';
    let params = [];
    let msgInfo = [];

    // 1. Get code params
    const { id } = req.params;

    try {

        // Init transaction mysql
        query = 'start transaction';
        const resInitTransaction = await performQuery(query, params);
        logger.info(query);

        msgInfo = 'Update state is successfully';

        // 2.1 change state to true and reset code
        await updateStateUser(parseInt(id));

        logger.debug(msgInfo);

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info(query);

        // TODO -- send email welcome

        res.json({ info: msgInfo });

    } catch (e) {

        // Rollback mysql
        query = 'rollback';
        await performQuery(query, params);
        logger.info(query);

        let msgError = ('Error in active user', e.message);
        logger.error(msgError);
        res.status(401).send(msgError);
        return;
    }

}

module.exports = {
    activeUser
};