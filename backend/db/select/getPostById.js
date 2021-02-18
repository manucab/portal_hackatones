const {performQuery} = require("../performQuery")

const getPostById = async(id) => {
   
    const query = 'select * from post where id = ?'
    const params = [id]

    const result = performQuery(query,params)
    
    return result
};



module.exports = getPostById