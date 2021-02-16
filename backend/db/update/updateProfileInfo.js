const {performQuery} = require("../performQuery");

const updateProfileInfo = async (
    id,
    name,
    surname,
    email,
    professional_profile,
    rol,
    newPassword,
    profile_picture
  ) => {

    //Get currentInfo 
    const queryOriginalInfo = `select * from competitor where id = ?`;
    const paramsOriginalInfo = [id];
    const originalInfo = await performQuery(
      queryOriginalInfo,
      paramsOriginalInfo
    );
    //Create var if empty use current info
    name = name || originalInfo[0].user_name;
    surname = surname || originalInfo[0].surname;
    email = email || originalInfo[0].email;
    professional_profile = professional_profile || originalInfo[0].professional_profile;
    rol = rol || originalInfo[0].rol;
    newPassword = newPassword || originalInfo[0].user_password;
    profile_picture = profile_picture || originalInfo[0].profile_picture
  
    const query = `
      update competitor
      set user_name = ?,
      surname = ?,
      email = ?,
      professional_profile= ?,
      rol = ?,
      user_password = ? ,
      profile_picture = ?
      where id = ?`;
    const params = [
      name,
      surname,
      email,
      professional_profile,
      rol,
      newPassword,
      profile_picture,
      id
    ];
  
    result = await performQuery(query, params);
  
    return "Your profile has been updated";
  };
  

module.exports = updateProfileInfo