const {performQuery} = require("../performQuery");

const updateProfileInfo = async (
    id,
    name,
    surname,
    email,
    professional_profile,
    rol,
    newPassword
  ) => {
    const queryOriginalInfo = `select * from competitor where id = ?`;
    const paramsOriginalInfo = [id];
    const originalInfo = await performQuery(
      queryOriginalInfo,
      paramsOriginalInfo
    );
  
    name = name || originalInfo[0].user_name;
    surname = surname || originalInfo[0].surname;
    email = email || originalInfo[0].email;
    professional_profile =
      professional_profile || originalInfo[0].professional_profile;
    rol = rol || originalInfo[0].rol;
    newPassword = newPassword || originalInfo[0].user_password;
  
    const query = `
      update competitor
      set user_name = ?,
      surname = ?,
      email = ?,
      professional_profile = ?,
      rol = ?,
      user_password = ? 
      where id = ?`;
    const params = [
      name,
      surname,
      email,
      professional_profile,
      rol,
      newPassword,
      id,
    ];
  
    result = await performQuery(query, params);
  
    return "Your profile has been updated";
  };
  

module.exports = updateProfileInfo