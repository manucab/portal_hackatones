// Variables && instances
require('dotenv').config();
const { logger } = require('../../app/config/logger');
const { createRoot } = require('../../db/adminRoot/db_initAdminRoot');

const createInitAdmin = async(req, res) => {

    try {

        const result = await createRoot();

        // Check result query insert default root
        const resQuery = (result.affectedRows === 0) ? 'Root exist' : 'Root create';

        res.send(resQuery);

    } catch (e) {
        logger.error('Fail insert defaul admin "root"');
        res.status(500).send();
    }

}

module.exports = {
    createInitAdmin
}