require('dotenv').config();
const { performQuery } = require('../performQuery');
const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const { logger } = require("../../app/config/logger");


const createRoot = async(req, res) => {

    // Params
    try {
        const key_admin = cryptoRandomString({ length: 20, type: 'ascii-printable' });
        const passwordEncrypt = await bcrypt.hash(process.env.ROOT_PASSWORD, 10);

        const query = 'insert ignore into admin (key_admin, name, email, state, password) values (?,?,?,?,?)';

        const params = [key_admin, process.env.ROOT_NAME, process.env.ROOT_EMAIL, true, passwordEncrypt];

        const result = await performQuery(query, params);

        return result;
    } catch (e) {

        let msgError = ('Error insert defaul admin "root":', e.message);
        logger.error(msgError);
        res.status(500).send(msgError);
    }

}

module.exports = {
    createRoot
}