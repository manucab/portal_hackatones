const {performQuery} = require("../performQuery");
const bcrypt = require('bcrypt');



const resetPassword = async (newPassword, email) => {

  const passwordEncrypt = await bcrypt.hash(newPassword, parseInt(process.env.PASSWORD_LEN))

  const query = `update competitor 
    set user_password = ?
    where email = ?`
  
  const params = [passwordEncrypt,email] 

  await performQuery(query,params)


  return "Your password has been updated";
};


module.exports = resetPassword