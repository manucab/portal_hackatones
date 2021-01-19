const formatDate = require ('../utils/formatDate')
const performQuery = require("./performQuery")


const updateProfileInfo = async (id,name,surname,email,professional_profile,rol) => {

    
    const queryOriginalInfo = `select * from competitor where id = ?`
    const paramsOriginalInfo = [id]
    originalInfo = await performQuery(queryOriginalInfo,paramsOriginalInfo)

    const query= `
    update competitor
    set user_name = ?,
    surname = ?,
    email = ?,
    professional_profile = ?,
    rol = ? 
    where id = ?`
    const params = [name || originalInfo[0].user_name,
        surname || originalInfo[0].surname,
        email || originalInfo[0].email,
        professional_profile || originalInfo[0].professional_profile,
        rol || originalInfo[0].rol,
        id]
   
    
    result = await performQuery(query,params)

    return 'Cambios realizados con éxito' 

}

const rateHackathon = async (idUser,idHackathon,rate) => {

    //Inscription_status is used to be sure the hackathon has alreday been ended.
    //This works if in the front we only have a button to rate in already finished hackathons
    const query= `
    update competitor_hackathon
    set rate = ?
    where id_competitor = ? and id_hackathon = ? and inscription_status = 'asistente'`
    
    const params = [rate,idUser,idHackathon]
    
    result = await performQuery(query,params)

    return 'Gracias por valorar el hackathon' 

}

const modifyHackathon = async (idUser,idHackathon,name,place,city,start_date,end_date,status,info) => {

    const queryOriginalInfo = `select * from hackathon where id = ?`
    const paramsOriginalInfo = [idHackathon]
    originalInfo = await performQuery(queryOriginalInfo,paramsOriginalInfo)

    const query= `
    update hackathon
    set hackathon_name = ?,
    hackathon_place = ?,
    city = ?,
    start_date = ?,
    end_date = ?,
    hackathon_status =?,
    hackathon_info = ?
    where id = ? and id_organizer = ?`
    const params = [name || originalInfo[0].hackathon_name,
        place || originalInfo[0].hackathon_place,
        city || originalInfo[0].city,
        start_date || formatDate(originalInfo[0].start_date),
        end_date || formatDate(originalInfo[0].end_date),
        status || originalInfo[0].hackathon_status,
        info || originalInfo[0].hackathon_info,
        idHackathon,
        idUser]
    console.log(params)
    
    result = await performQuery(query,params)

    return 'Cambios realizados con éxito' 

}

const modifyPost = async (idPost,title,content,publication_date,hidden) => {

    const queryOriginalInfo = `select * from post where id = ?`
    const paramsOriginalInfo = [idPost]
    originalInfo = await performQuery(queryOriginalInfo,paramsOriginalInfo)
   
    const newTitle = title || originalInfo[0].title
    const newContent = content || originalInfo[0].content
    const newPublicationDate = publication_date || originalInfo[0].publication_date
    const newHidden = hidden || originalInfo[0].hidden

    const query= `
    update post
    set title = ?,
    content = ?,
    publication_date = ?,
    hidden = ?
    where id = ?`    

    const params = [newTitle,newContent,newPublicationDate,newHidden,idPost]
    
    result = await performQuery(query,params)

    return 'Cambios realizados con éxito' 

}


module.exports = {
    updateProfileInfo,
    rateHackathon,
    modifyHackathon,
    modifyPost
}