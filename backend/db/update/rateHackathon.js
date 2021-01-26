const performQuery = require("../performQuery");


const rateHackathon = async (idUser, idHackathon, rate) => {
  const query = `
    update competitor_hackathon
    set rate = ?
    where id_competitor = ? and id_hackathon = ? and inscription_status = 'asistente'`;

  const params = [rate, idUser, idHackathon];

  result = await performQuery(query, params);

  return "Thank you for rate this hackathon";
};


module.exports = rateHackathon