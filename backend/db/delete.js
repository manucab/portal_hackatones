const performQuery = require("./performQuery")


const deleteUser = async (id) => {

    const query= `
    update competitor
    set active_user = 'false'
    where id = ?`
    const params = [id]
   
    
    result = await performQuery(query,params)

    return 'Se ha eliminado el usuario' 

}

module.exports = {
    deleteUser
}