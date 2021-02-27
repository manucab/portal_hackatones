  // Variables && instances
  require('dotenv').config();
  const { getTechDB } = require('../../db/select/getTech');
  const { insertNewTechDB } = require('../../db/insert/insertNewTech');
  const { insertNewHackathonTechDB } = require('../../db/insert/insertNewHackathonTech');

  const auxInsertTech = async(tech, id_hackathon) => {

      let id_tech = [];
      let params = [];
      let id_exist = [];
      let valuesTech = [];
      let id_notExist = [];

      // Fucntion for prepara string query mysql, amoung of values as ? or a pair (?,?)
      const getParams = (len, format) => Array(len).fill(`${format}`).join();

      // 1. Prepare the query
      params = getParams(tech.length, '?');

      // 2.  Get the tech that exist in db
      id_exist = await getTechDB(tech, params);

      // 3. Check if exist new tech
      if (id_exist.length < tech.length) {

          // 4. Delete techs that exist and to keep with new techs
          id_notExist = tech.filter(item => !id_exist.includes(item));

          // 5. Prepare the params of query
          params = getParams(id_notExist.length, '(?)');

          // 6. Get id of that tech
          const { affectedRows, insertId } = await insertNewTechDB(id_notExist, params);

          // 6.1 add to id_tech the id's of new techs
          for (let j = 0; j < affectedRows; j++) {
              let id_new = insertId + j;
              id_tech.push(id_new);
          }
      }

      // 7. Add id that tech to add in table hackathon_tech
      id_exist.forEach(item => id_tech.push(item.id));

      // 8. Sort array from smallest to largest
      id_tech = id_tech.sort((a, b) => a - b);

      // 9. Prepare params of string query values (id_hackathon, tech))
      params = getParams(id_tech.length, '(?,?)');

      // Prepare values to format of query (id_hackathon, tech) values (), (), ()
      id_tech.forEach(item => valuesTech.push(id_hackathon, item));



      // Insert into table new hackathon_tech
     const rests= await insertNewHackathonTechDB(valuesTech, params);

     console.log('rests :>> ', rests);

  }

  module.exports = {
      auxInsertTech
  }