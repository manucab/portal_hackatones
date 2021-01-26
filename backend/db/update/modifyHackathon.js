const formatDate = require("../../utils/formatDate");
const performQuery = require("../performQuery");

const modifyHackathon = async (
  idUser,
  idHackathon,
  name,
  place,
  city,
  start_date,
  end_date,
  status,
  info
) => {
  const queryOriginalInfo = `select * from hackathon where id = ?`;
  const paramsOriginalInfo = [idHackathon];
  originalInfo = await performQuery(queryOriginalInfo, paramsOriginalInfo);
  const checkedHackathon = originalInfo.length === 1;
  if (!checkedHackathon) {
    return "Hackathon not found";
  }

  const query = `
    update hackathon
    set hackathon_name = ?,
    hackathon_place = ?,
    city = ?,
    start_date = ?,
    end_date = ?,
    hackathon_status =?,
    hackathon_info = ?
    where id = ? and id_organizer = ?`;
  const params = [
    name || originalInfo[0].hackathon_name,
    place || originalInfo[0].hackathon_place,
    city || originalInfo[0].city,
    start_date || formatDate(originalInfo[0].start_date),
    end_date || formatDate(originalInfo[0].end_date),
    status || originalInfo[0].hackathon_status,
    info || originalInfo[0].hackathon_info,
    idHackathon,
    idUser,
  ];

  result = await performQuery(query, params);

  return "The hackathon has been succesfully modified";
};


module.exports = modifyHackathon