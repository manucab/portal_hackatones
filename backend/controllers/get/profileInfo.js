const db = require("../../db/select");

const profileInfo = async (req, res) => {
  const { id } = req.params;
  let profile;
  let hackathons;
  let stats;
  let data

  try {
    data = await db.profileInfo(id);
    profile = data[0];
    hackathons = data[1];
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

module.exports = profileInfo;
