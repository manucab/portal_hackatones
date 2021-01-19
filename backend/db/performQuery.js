const { getConnection } = require("./connection");


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