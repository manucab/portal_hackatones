const performQuery = require("../db/performQuery");


const checkEmail = async (email) => {
    const query = `select * from competitor where email = ? and active_user = 'true'`
     
    const params = [email];
  
    result = await performQuery(query,params);
    
    return result;
  };

  module.exports = checkEmail