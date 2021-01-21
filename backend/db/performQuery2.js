const { getConnection } = require("./connection");


const performQuery2 = async(query, params) => {
    let connection;

    try {
        connection = await getConnection();


        // connection.config.queryFormat = function (query, params) {
        //   if (!params) return query;
        //   return query.replace(/\:(\w+)/g, function (txt, key) {
        //     if (params.hasOwnProperty(key)) {
        //       return this.escape(params[key]);
        //     }
        //     return txt;
        //   }.bind(this));
        // };


        const [result] = await connection.query(query, params);


        return result;
    } catch (e) {
        console.log('e :>> ', e);
        throw new Error("database-error", e);

    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = { performQuery2 }
