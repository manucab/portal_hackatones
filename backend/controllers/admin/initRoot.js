// Variables && instances
require('dotenv').config();
const { logger } = require('../../app/config/logger');
const { createRoot } = require('../../db/adminRoot/db_initAdminRoot');

const createInitAdmin = async(req, res) => {

    try {

        const result = await createRoot();

        // Check result query insert default root
        const resQuery = (result.affectedRows === 0) ? 'Root exist' : 'Root create';

        res.json({ info: resQuery });

    } catch (e) {
        let msgError = ('Error in init root:', e.message);
        logger.error(msgError);
        res.status(500).send(msgError);
    }

}

module.exports = {
    createInitAdmin
}