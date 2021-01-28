const { getConnection } = require("./connection");
const { logger } = require("../app/config/logger");

const performQuery = async(query, params) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(query, params);

        return result;
    } catch (e) {

        let msgError = ('Database-error:', e.sqlMessage);
        logger.error(msgError);
        throw new Error(msgError);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = { performQuery }