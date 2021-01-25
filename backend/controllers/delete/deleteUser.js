const db = require("../../db/delete");
const { getUsersIdDB } = require("../../db/select");

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const ids = await getUsersIdDB(id);
    console.log(ids)

    if (ids.indexOf(parseInt(id)) === -1) {
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
