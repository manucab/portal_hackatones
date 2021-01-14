// variables && instances
const { getConnection } = require('./connection');

// Funtion try/catch for all query db
const performQuery = async(query, params) => {
    let connection;

    // Create a pool conection with databse
    connection = await getConnection();

    try {
        // Make the query
        return await connection.query(query, params);
    } catch (e) {
        // throw new Error('database-error');
        console.log('Error performQuery conection');
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

module.exports = {
    performQuery
}
