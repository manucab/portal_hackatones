const dbGetProfileInfo = require("../../db/select/getProfileInfo");

const getProfileInfo = async (req, res) => {
  const { id } = req.params;
  let profile;
  let hackathonsParticipations;
  let hackathonsOrganizated
  let stats;
  let data

  try {
    data = await dbGetProfileInfo(id);
    profile = data[0];
    hackathonsParticipations = data[1];
    hackathonsOrganizated = data[2]
    stats = data[2];
    //Profile is only empty if the user doesnt exists
    if (profile.length === 0) {
      res.status(401).send("User not found");
      return;
    }
  } catch (e) {
    res.send(e.message);
    return;
  }
  res.send(data);
};

module.exports = getProfileInfo;
