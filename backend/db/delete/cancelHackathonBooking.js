const {performQuery} = require("../performQuery")

const cancelHackathonBooking = async (idUser, idHackathon) => {
  const query = `
    update competitor_hackathon
    set inscription_status = 'cancelado'
    where id_competitor = ? and id_hackathon=?`;
  const params = [idUser, idHackathon];

  result = await performQuery(query, params);
  return "The booking has been canceled";
};

module.exports = cancelHackathonBooking