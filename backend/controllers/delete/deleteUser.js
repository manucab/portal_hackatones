const dbDeleteUser = require("../../db/delete/deleteUser");
const getUserById = require("../../db/select/getUserById");

const deleteUser = async (req, res) => {
  const { idUser } = req.params;

  try {
    const check = await getUserById(idUser);
    const checked = check.length === 1

    if (!checked) {
      res.status(401).send("User not found");
      return;
    }
    result = await dbDeleteUser(idUser);
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(result);
};

module.exports = deleteUser;
