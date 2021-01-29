const {performQuery} = require("../performQuery");


const resetPassword = async (newPassword, email) => {

  const query = `update competitor 
    set user_password = ?
    where email = ?`
  
  const params = [newPassword,email] 

  await performQuery(query,params)


  return "Your password has been updated";
};


module.exports = resetPassword