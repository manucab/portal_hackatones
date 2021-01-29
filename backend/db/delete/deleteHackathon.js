const {performQuery} = require("../performQuery")

const deleteHackathon = async (idUser, idHackathon) => {
  const query = `
    update hackathon
    set hackathon_status = 'cancelado'
    where id_organizer = ? and id=?`;
  const params = [idUser, idHackathon];

  result = await performQuery(query, params);

  return "The hackathon has been canceled";
};

module.exports = deleteHackathon