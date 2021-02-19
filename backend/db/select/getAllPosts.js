const {performQuery} = require("../performQuery")

const getAllPosts = async() => {
   
    const query = 'select * from post order by publication_date desc'
    const params = []

    const result = performQuery(query,params)
    
    return result
};



module.exports = getAllPosts