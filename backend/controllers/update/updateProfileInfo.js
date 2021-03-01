const dbUpdateProfileInfo = require("../../db/update/updateProfileInfo");
const getUserById  = require("../../db/select/getUserById");
const profileInfoValidator = require("../../validators/profileInfoValidator");
const bcrypt = require('bcrypt');


const updateProfileInfo = async (req, res) => {
  const {
    user_name,
    surname,
    email,
    professional_profile,
    rol,
    currentPassword,
    newPassword,
    passwordConfirmation
  } = req.body;
  const { idUser } = req.params;

  let profile_picture = req.pathFile || ''
  

  try {
    //Check if user want to change password
    //Check that the new password and the password confimation are equals
    const check = await getUserById(idUser)
    const checked = check.length === 1

    if(!checked) {
      res.status(500).send("User not found");
      return;
    }

    if (newPassword) {
      await profileInfoValidator.validateAsync(req.body);
      if (newPassword !== passwordConfirmation) {
        res
          .status(400)
          .send(
            "The new password has to be the same as the confirmation password"
          );
        return;
      }
      const userDB = await getUserById(parseInt(idUser));
      const passwordDB = userDB[0].user_password;
      // 4. Check password with bcrypt
     
      const passwordIsvalid = await bcrypt.compare(currentPassword,passwordDB);

      if (!passwordIsvalid) {
        res.status(401).send("Incorrect current password");
        return;
      }
    }

    await profileInfoValidator.validateAsync(req.body);

    result = await dbUpdateProfileInfo(
      idUser,
      user_name,
      surname,
      email,
      professional_profile,
      rol,
      newPassword,
      profile_picture
    );
   
  } catch (e) {
    res.send(e.message);
    return;
  }
 
  res.send(result);
};

module.exports = updateProfileInfo;
