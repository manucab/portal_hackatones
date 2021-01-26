const performQuery = require("./performQuery");

const deleteUser = async (id) => {
  const query = `
    update competitor
    set active_user = 'false',
    deleted_user = 'true'
    where id = ?`;
  const params = [id];

  result = await performQuery(query, params);

  return "The user has been removed";
};

const cancelHackathonBooking = async (idUser, idHackathon) => {
  const query = `
    update competitor_hackathon
    set inscription_status = 'cancelado'
    where id_competitor = ? and id_hackathon=?`;
  const params = [idUser, idHackathon];

  result = await performQuery(query, params);
  return "The booking has been canceled";
};

const deleteHackathon = async (idUser, idHackathon) => {
  const query = `
    update hackathon
    set hackathon_status = 'cancelado'
    where id_organizer = ? and id=?`;
  const params = [idUser, idHackathon];

  result = await performQuery(query, params);

  return "The hackathon has been canceled";
};

const deletePost = async (idPost) => {
  const query = `delete from post
    where id = ?`;
  const params = [idPost];

  result = await performQuery(query, params);

  return "The post has been deleted";
};

module.exports = {
  deleteUser,
  cancelHackathonBooking,
  deleteHackathon,
  deletePost,
};
