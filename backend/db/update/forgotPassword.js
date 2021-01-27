const performQuery = require("../performQuery");


const forgotPassword = async (token, email) => {
  const query = `update competitor
    set reset_password_code = ?
    where email = ?`
  
  const params = [token,email] 

  await performQuery(query,params)

  return  ;
};


module.exports = forgotPassword