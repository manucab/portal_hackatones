const performQuery = require("../performQuery");


const removeToken = async (email) => {
  const query = `
    update competitor
    set reset_password_code = ''
    where email = ?`;

  const params = [email];

  result = await performQuery(query, params);

  return ;
};


module.exports = removeToken