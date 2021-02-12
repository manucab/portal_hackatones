const {performQuery} = require("../performQuery");

const updateProfileInfo = async (
    id,
    name,
    surname,
    email,
    professionalProfile,
    rol,
    newPassword,
    profilePicture
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
    professionalProfile = professionalProfile || originalInfo[0].professionalProfile;
    rol = rol || originalInfo[0].rol;
    newPassword = newPassword || originalInfo[0].user_password;
    profilePicture = profilePicture || originalInfo[0].profilePicture
  
    const query = `
      update competitor
      set user_name = ?,
      surname = ?,
      email = ?,
      professionalProfile = ?,
      rol = ?,
      user_password = ? ,
      profilePicture = ?
      where id = ?`;
    const params = [
      name,
      surname,
      email,
      professionalProfile,
      rol,
      newPassword,
      profilePicture,
      id
    ];
  
    result = await performQuery(query, params);
  
    return "Your profile has been updated";
  };
  

module.exports = updateProfileInfo