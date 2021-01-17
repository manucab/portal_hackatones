// Variables && instances
require('dotenv').config();
const { createRoot } = require('../../db/adminRoot/db_initAdminRoot');

const createInitAdmin = async(req, res) => {

    try {

        const result = await createRoot();

        // Check result query insert default root
        const resQuery = (result.affectedRows === 0) ? 'Root exist' : 'Root create';

        res.send(resQuery);

    } catch (e) {
        console.log('Fail insert defaul admin "root" ');
        res.status(500).send();
    }

}


module.exports = {
    createInitAdmin
}