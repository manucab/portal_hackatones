const performQuery = require("../performQuery");

const getCommentsByHackathon = async (idHackathon) => {
  const query = "select * from comment where id_hackathon=?";

  const params = [idHackathon];

  const result = await performQuery(query, params);

  return result;
};


module.exports = getCommentsByHackathon