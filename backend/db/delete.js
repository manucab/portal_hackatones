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

const cancelHackathonBooking = async (idUser,idHackathon) => {
    
    const query= `
    update competitor_hackathon
    set inscription_status = 'cancelado'
    where id_competitor = ? and id_hackathon=?`
    const params = [idUser,idHackathon]
   
    result = await performQuery(query,params)

    return 'Se ha cancelado la reserva' 


}

module.exports = {
    deleteUser,
    cancelHackathonBooking
}