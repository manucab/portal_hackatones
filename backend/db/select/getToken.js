const {performQuery} = require("../performQuery");

const getToken = async (email) => {
  const query = "select  reset_password_code from competitor where email=?";

  const params = [email];

  const result = await performQuery(query, params);

  return result;
};


module.exports = getToken