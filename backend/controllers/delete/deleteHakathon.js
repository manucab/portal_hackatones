const dbDeleteHackathon = require("../../db/delete/deleteHackathon");
const getHackathonId = require("../../db/select/getHackathonId")

const deleteHackathon = async (req, res) => {
  const { idUser, idHackathon } = req.params;

  try {
    const check = await getHackathonId(idHackathon);
    console.log(check)
    const checked = check.length === 1;

    if (!checked) {
      res.status(401).send("Hackathon not found");
      return;
    }
    result = await dbDeleteHackathon(idUser, idHackathon);
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(result);
};

module.exports = deleteHackathon;
