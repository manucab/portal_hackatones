const db = require("../../db/update");
const { getUserDB } = require("../../db/select");
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
      const userDB = await getUserDB(email);
      const passwordDB = userDB.user_password;

      if (currentPassword != passwordDB) {
        res.status(401).send("Incorrect current password");
        return;
      }
    }

    result = await db.updateProfileInfo(
      id,
      name,
      surname,
      email,
      professional_profile,
      rol,
      newPassword
    );
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(result);
};

module.exports = updateProfileInfo;
