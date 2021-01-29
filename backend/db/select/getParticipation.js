const {performQuery} = require("../performQuery")


const getParticipation = async (idUser,idHackathon) => {

  const query = `select * from competitor_hackathon 
    where id_competitor = ? and id_hackathon = ?`

  const params = [idUser,idHackathon]
  result = performQuery(query,params)
  return result
}

module.exports = getParticipation