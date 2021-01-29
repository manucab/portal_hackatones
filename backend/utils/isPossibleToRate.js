const {performQuery} = require("../db/performQuery");


const isPossibleToRate = async (idUser,idHackathon) => {
    const query = `select * from competitor_hackathon 
      where id_competitor = ? and id_hackathon=? and inscription_status = 'asistente'`;
    const params = [idUser, idHackathon];
  
    result = await performQuery(query,params)

    return result.length === 1 ? true : false
  }

module.exports = isPossibleToRate