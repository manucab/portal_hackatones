// Variables && instances
require('dotenv').config();
const mysql = require("mysql2/promise");

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
        console.log('Error conecton with database', 'e=>', e);
    }

}


getConnection();

module.exports = {
    getConnection,
};
