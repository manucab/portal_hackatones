const { getConnection } = require("./connection");
<<<<<<< HEAD


const performQuery = async (query, params) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const [result] = await connection.query(query, params);
  
      return result;
    } catch (e) {
      console.log(e.message)
      throw new Error("database-error")
      ;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  };

  module.exports = performQuery
=======
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
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
