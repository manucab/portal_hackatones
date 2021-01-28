<<<<<<< HEAD
require("dotenv").config();

const mysql = require("mysql2/promise");

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
=======
// Variables && instances
require('dotenv').config();
const mysql = require("mysql2/promise");
const { logger } = require("../app/config/logger");

>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d

let pool;

async function getConnection() {
<<<<<<< HEAD
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: "Z",
    });
  }

  return await pool.getConnection();
}



module.exports = {
    getConnection
}
=======

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
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
