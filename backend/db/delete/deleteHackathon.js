const {performQuery} = require("../performQuery")

const deleteHackathon = async (idUser, idHackathon) => {
  const query = `
    update hackathon
    set hackathon_status = 'cancelado'
    where id_organizer = ? and id=?`;
  const params = [idUser, idHackathon];

  const query2 = `
    update competitor_hackathon
    set inscription_status = 'cancelado'
    where id_hackathon = ?`

  const params2 = [idHackathon]

  result = await performQuery(query, params);
  result2 = await performQuery(query2,params2)


  return "The hackathon has been canceled";
};

module.exports = deleteHackathon