const dbUpdateProfileInfo = require("../../db/update/updateProfileInfo");
const getUserById  = require("../../db/select/getUserById");
const profileInfoValidator = require("../../validators/profileInfoValidator");

const updateProfileInfo = async (req, res) => {
  const {
    name,
    surname,
    email,
    professional_profile,
    rol,
    currentPassword,
    newPassword,
    passwordConfirmation,
  } = req.body;
  const { id } = req.params;

  try {
    //Check if user want to change password
    //Check that the new password and the password confimation are equals
    const check = await getUserById(id)
    const checked = check.length === 1

    if(!checked) {
      res.status(401).send("User not found");
      return;
    }

    if (newPassword) {
      await profileInfoValidator.validateAsync(req.body);
      if (newPassword != passwordConfirmation) {
        res
          .status(400)
          .send(
            "The new password has to be the same as the confirmation password"
          );
        return;
      }
      const userDB = await getUserById(id);
      const passwordDB = userDB.user_password;

      if (currentPassword != passwordDB) {
        res.status(401).send("Incorrect current password");
        return;
      }
    }

    await profileInfoValidator.validateAsync(req.body);

    result = await dbUpdateProfileInfo(
      id,
      name,
      surname,
      email.toLowerCase(),
      professional_profile.toLowerCase(),
      rol.toLowerCase(),
      newPassword
    );
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(result);
};

module.exports = updateProfileInfo;
