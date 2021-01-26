const db = require("../../db/delete");
const { getUserById } = require("../../db/select");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const check = await getUserById(id);
    const checked = check.length === 1

    if (!checked) {
      res.status(401).send("User not found");
      return;
    }
    result = await db.deleteUser(id);
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(result);
};

module.exports = deleteUser;
