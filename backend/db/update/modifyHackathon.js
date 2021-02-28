const getIdsNewValuesTech = require("../../utils/getIdsNewValuesTech");
const getIdsNewValuesLink = require("../../utils/getIdsNewValuesLink");

const formatDate = require("../../utils/formatDate");
const { performQuery } = require("../performQuery");
const { logger } = require("../../app/config/logger");

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
  links,
  cover_picture,
  thematic
) => {
  try {
    const queryOriginalInfo = `select * from hackathon where id = ?`;
    const paramsOriginalInfo = [idHackathon];
    originalInfo = await performQuery(queryOriginalInfo, paramsOriginalInfo);
    const checkedHackathon = originalInfo.length === 1;
    if (!checkedHackathon) {
      return "Hackathon not found";
    }

    //The functions bellow getIds we need and also insert new elements if there are any


    const parsedLinks = JSON.parse(links);
    const parsedTechs = JSON.parse(techs);

    techIds = await getIdsNewValuesTech(parsedTechs);
    linkIds = await getIdsNewValuesLink(parsedLinks);

    //Delete the previous registers of tech and links we have for that hackathon
    const deleteTechQuery = `delete from hackathon_tech 
    where id_hackathon = ?`;

    const deleteLinkQuery = `delete from hackathon_link 
    where id_hackathon = ?`;
    const paramsDeleteQuery = [idHackathon];

    const dt = await performQuery(deleteTechQuery, paramsDeleteQuery);
    const dl = await performQuery(deleteLinkQuery, paramsDeleteQuery);

    console.log(dt, dl);

    logger.info("Prepare techs and links");

    //Update hackathon_tech and hackathon_link

    const setT = "(?,?),".repeat(techIds.length).slice(0, -1);
    let tParams = [];
    for (id of techIds) {
      tParams = [...tParams, idHackathon, parseInt(id)];
    }

    const queryT = `insert into hackathon_tech (id_hackathon,id_tech)
    values ${setT}`;

    const t = await performQuery(queryT, tParams)

    const setL = "(?,?),".repeat(linkIds.length).slice(0, -1);
    let lParams = [];
    for (id of linkIds) {
      lParams = [...lParams, parseInt(idHackathon), parseInt(id)];
    }
    const queryL = `insert into hackathon_link (id_hackathon,id_link)
    values ${setL};`;
  
    const l = await performQuery(queryL, lParams);
   

    logger.info("techs and links updated");

    //Update fields from table hackathon
    const query = `
    update hackathon
    set hackathon_name = ?,
    hackathon_place = ?,
    city = ?,
    start_date = ?,
    end_date = ?,
    hackathon_status =?,
    hackathon_info = ?,
    cover_picture = ?,
    thematic = ?
    where id = ? and id_organizer = ?`;
    const params = [
      name || originalInfo[0].hackathon_name,
      place || originalInfo[0].hackathon_place,
      city || originalInfo[0].city,
      start_date || formatDate(originalInfo[0].start_date),
      end_date || formatDate(originalInfo[0].end_date),
      status || originalInfo[0].hackathon_status,
      info || originalInfo[0].hackathon_info,
      cover_picture || originalInfo[0].cover_picture,
      JSON.parse(thematic).join(',') || originalInfo[0].thematic,
      idHackathon,
      idUser,
    ];
    logger.info("hackathon fully updated");

    result = await performQuery(query, params);

    return "The hackathon has been succesfully modified";
  } catch (e) {
    
    console.log(e);
    logger.error(e.message);
    throw e.message;
  }
};

module.exports = modifyHackathon;
