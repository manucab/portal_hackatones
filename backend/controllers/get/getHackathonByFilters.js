// Variables && instances
require('dotenv').config();
const {logger} = require("../../app/config/logger");
const {getHackathonInfoDB} = require('../../db/select');
const {getListLinkByHackathonDB} = require('../../db/select/getListLinkByHackathon');
const { getListTechByHackathonDB} = require('../../db/select/getListTechByHackathon');
const {  getListCommentByHackathonDB} = require('../../db/select/getCommentByHackathon');
const {
  performQuery
} = require('../../db/performQuery');
const {
  filterHackathons
} = require('../../validators/val_filterHackathon');

const getHackathonByFilters = async (req, res) => {

  let msgResponse = [];
  let query = '';
  let params = [];

  // 1. Get parameters of req.query
  const {
    hackathon_place,
    city,
    start_date,
    end_date,
    thematic,
    tech
  } = req.query;


  const {
    id
  } = req.params;


  try {

    // 1.0 Check the parameters are valid?
    await filterHackathons.validateAsync({
      hackathon_place,
      city,
      start_date,
      end_date,
      tech,
      thematic
    });

    // Fucntion for prepara string query mysql, amoung of values as ? or a pair (?,?)
    const getParams = (len, format) => Array(len).fill(`${format}`).join();

    //Start transaction mysql
    query = 'start transaction';
    await performQuery(query, params);
    logger.info('Init transaction query');

    //  2. Search parameters -> {hackathon_place, city,start_date, end_date, technologies,thematic }
    const listHackathons = await getHackathonInfoDB(id, hackathon_place, city, start_date, end_date, thematic);

    // Get id's of hackathons filter for search tech and link 
    let listIdHackathons = listHackathons.map(item => item.id);


    if (!listHackathons || listHackathons.length <= 0) {
      msgResponse = {
        Info: 'No result found'
      };
    } else {

      // Prepare query (id_hackathon, id_link)
      params = getParams(listIdHackathons.length, '?');
      // 1. Search in table hackathon_link and get id of links
      let resLinks = await getListLinkByHackathonDB(listIdHackathons, params);

      // 2. Search in table hackathon_tech and get id of tech
      let resTechs = await getListTechByHackathonDB(listIdHackathons, params);

      // TODO -- add comments of hackathon filter
      // let resComment = await getListCommentByHackathonDB(listIdHackathons, params);

console.log('resLinks :>> ', resLinks);
      // console.log('resComment :>> ', resComment);


      listHackathons.forEach(item => {
        let listLinkInfo = resLinks.filter(info => info.id_hackathon === item.id).map(element => ({
          url: element.url,
          web_name: element.web_name
        }));
        let listTechInfo = resTechs.filter(info => info.id_hackathon === item.id).map(element => (element.tech_name));

        if (listLinkInfo)(item['link'] = listLinkInfo)
        if (listTechInfo)(item['tech'] = listTechInfo)

      });

      let hackathon = [];

      // Filter of technologies
      if (tech) {
        // Filter for technologies, get array of tech hackathon and filter with parameter array tech
        hackathon = listHackathons.filter(item => item['tech'].some(j => tech.includes(j)));
      } else {
        hackathon = [...listHackathons];
      }

      // Format data hackathon...
      hackathon.forEach(item => {
        msgResponse.push({
          id:item.id,
          hackathon_name: item.hackathon_name,
          hackathon_place: item.hackathon_place,
          city: item.city || 'not info',
          start_date: item.start_date,
          end_date: item.end_date,
          hackathon_status: item.hackathon_status || 'not info',
          hackathon_info: item.hackathon_info || 'not info',
          thematic: item.thematic,
          link: item.link || 'not info',
          tech: item.tech || 'not info',
          cover_picture: item.cover_picture || 'not info'
        });


      })

    }

    // Commit mysql
    query = 'commit';
    await performQuery(query, params);
    logger.info('Commit');

    // 2. send result json
    res.json(msgResponse);

  } catch (e) {

    // Something wrong --> Rollback
    query = 'rollback';
    await performQuery(query, params);
    logger.error(query);

    let msgError = ('Error get hackathon info:', e.message);
    logger.error(msgError);
    return res.status(500).json({
      info: msgError
    });
  }

}

module.exports = {
  getHackathonByFilters
}