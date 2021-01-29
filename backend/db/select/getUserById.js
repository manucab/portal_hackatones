const {performQuery} = require("../performQuery");

const getUserById = async (id) => {
  const query = "select * from competitor where id=?";

  const params = [id];

  const result = await performQuery(query, params);

  return result;
};


module.exports = getUserById