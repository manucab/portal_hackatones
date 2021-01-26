const performQuery = require("../performQuery");


const getHackathonId = async (idHackathon) => {
  const query = `select id from hackathon
    where id = ?`;
  const params = [idHackathon]
  const result = performQuery(query,params);
  return result;
};

module.exports = getHackathonId