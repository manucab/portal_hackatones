// Variables && instances
require('dotenv').config();
const mysql = require("mysql2/promise");
const { logger } = require("../app/config/logger");


let pool;

async function getConnection() {

    try {
        if (!pool) {
            pool = mysql.createPool({
                connectionLimit: 10,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_KEY,
                database: process.env.DB_NAME
            });
        }

        return await pool.getConnection();
    } catch (e) {
        let msgError = ('Error conecton with database:', e.message);
        logger.error(msgError);
        res.status(500).send(msgError);
    }

}

module.exports = {
    getConnection,
};