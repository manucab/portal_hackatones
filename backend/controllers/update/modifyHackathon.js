const dbModifyHackathon = require("../../db/update/modifyHackathon");
const { hackathonValidator } = require("../../validators/hackathonValidator");
const getHackathonId = require("../../db/select/getHackathonId");

const modifyHackathon = async (req, res) => {
  let { name, place, city, start_date, end_date, status, info,techs,links, cover_picture } = req.body;
  let { idHackathon, idUser } = req.params;

  try {
    const check = await getHackathonId(idHackathon);
    const checked = check.length === 1;

    if (!checked) {
      res.status(401).send("Hackathon not found");
      return;
    }

    await hackathonValidator.validateAsync(req.body);
    result = await dbModifyHackathon(
      idUser,
      idHackathon,
      name,
      place,
      city,
      start_date,
      end_date,
      status,
      info,
      techs,
      links,
      cover_picture
    );
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(result);
};

module.exports = modifyHackathon;
