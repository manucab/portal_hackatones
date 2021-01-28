const getIdsNewValuesTech = require("../../utils/getIdsNewValuesTech")
const getIdsNewValuesLink = require("../../utils/getIdsNewValuesLink")

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
  info,
  techs,
  links
) => {
  const queryOriginalInfo = `select * from hackathon where id = ?`;
  const paramsOriginalInfo = [idHackathon];
  originalInfo = await performQuery(queryOriginalInfo, paramsOriginalInfo);
  const checkedHackathon = originalInfo.length === 1;
  if (!checkedHackathon) {
    return "Hackathon not found";
  }

  //The functions bellows getIds we need and also insert new elements if there are any
  techIds = await getIdsNewValuesTech(techs)
  linkIds = await getIdsNewValuesLink(links)

  //Delete the previous registers of tech and links we have for that hackathon
  const deleteTechQuery = `delete from hackathon_tech 
    where id_hackathon = ?`

  const deleteLinkQuery = `delete from hackathon_link 
    where id_hackathon = ?`
  const paramsDeleteQuery = [idHackathon]

  await performQuery(deleteTechQuery,paramsDeleteQuery)
  await performQuery(deleteLinkQuery,paramsDeleteQuery)

  //Update hackathon_tech and hackathon_link
  for (const techId of techIds) {
    const query = `insert into hackathon_tech (id_hackathon,id_tech)
      values (?,?)`
    const params = [idHackathon,techId]
    await performQuery (query,params)

  }

  for (const linkId of linkIds) {
    const query = `insert into hackathon_link (id_hackathon,id_link)
      values (?,?)`
    const params = [idHackathon,linkId]
    await performQuery (query,params)

  }


  
  //Update fields from table hackathon
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
    name.toLowerCase() || originalInfo[0].hackathon_name,
    place.toLowerCase() || originalInfo[0].hackathon_place,
    city.toLowerCase() || originalInfo[0].city,
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