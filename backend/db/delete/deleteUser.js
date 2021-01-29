const {performQuery} = require("../performQuery")

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

module.exports = deleteUser