const { getConnection } = require("./connection");

const showAll = async () => {
    let connection;
    try {
        connection = await getConnection()
        const [result] = await connection.query("SELECT * FROM competitor")
        console.log(result)
        return result
    } catch (e) {
        throw new Error ("database-error")
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

module.exports = {
    showAll
}