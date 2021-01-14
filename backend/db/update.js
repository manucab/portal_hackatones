const performQuery = require("./performQuery")


const updateProfileInfo = async (id,name,surname,email,professional_profile,rol) => {

    
    const queryInfo = `select * from competitor where id = ?`
    const paramsInfo = [id]
    infoToUpdate = await performQuery(queryInfo,paramsInfo)

    const query= `
    update competitor
    set user_name = ?,
    surname = ?,
    email = ?,
    professional_profile = ?,
    rol = ? 
    where id = ?`
    const params = [name || infoToUpdate[0].user_name,
        surname || infoToUpdate[0].surname,
        email || infoToUpdate[0].email,
        professional_profile || infoToUpdate[0].professional_profile,
        rol || infoToUpdate[0].rol,
        id]
   
    
    result = await performQuery(query,params)

    return 'Cambios realizados con éxito' 

}

module.exports = {
    updateProfileInfo
}