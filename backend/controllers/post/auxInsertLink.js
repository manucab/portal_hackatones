  // Variables && instances
  require('dotenv').config();
  const { getLinksDB } = require('../../db/select/getLinks');
  const { insertNewTechDB } = require('../../db/insert/insertNewTech');
  const { insertNewHackathonTechDB } = require('../../db/insert/insertNewHackathonTech');

  const auxInsertLink = async(links, id_hackathon) => {

      let links_exist = [];
      let links_notExist = [];
      let params = [];
      let hostname = [];
      let webName = [];

      console.log('links :>> ', links);

      hostname = links.map(item => item.link);
      webName = links.map(item => item.webName);


      console.log('hostname :>> ', hostname);
      console.log('url :>> ', webName);

      // Fucntion for prepara string query mysql, amoung of values as ? or a pair (?,?)
      const getParams = (len, format) => Array(len).fill(`${format}`).join();



      // 0. Prepare the params of string query
      // 1. Prepare the query
      params = getParams(hostname.length, '?');
      // 1. Check the links exist, search by hostname. Get links that exist into db
      links_exist = await getLinksDB(hostname, params);
      console.log('links_exist :>> ', links_exist);
      // 3. Check id exist new links in db len of exist < len of notExist
      if (links_exist.length < links.length) {
          // 4. YES exist new links
          // 4.1 delete links of exist in db and put in array_links not exist
          links_notExist = links.filter(item => !links_exist.includes(item));

          console.log('links_notExist :>> ', links_notExist);
          // 4.2 prepare params for string query
          // 4.3 Inser into table links new links and get id new insert links
          // 4.4 and to final array the totals id
      }

      // 5. NO exist new links
      // 5.1 add to final array the totals id of exist
      // 6. Sort final array
      // 7. Prepare params of string query
      // 8. Insert into table hackathon_link

  }


  module.exports = {
      auxInsertLink
  }