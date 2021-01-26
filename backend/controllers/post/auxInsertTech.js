  // Variables && instances
  require('dotenv').config();
  const { getTechDB } = require('../../db/select/getTech');
  const { insertNewTechDB } = require('../../db/insert/insertNewTech');
  const { insertNewHackathonTechDB } = require('../../db/insert/insertNewHackathonTech');


  const auxInsertTech = async(tech, id_hackathon) => {

      let id_tech = 0;

      // 1. Search in db table tech if exist that tech
      const res_tech = await getTechDB(tech.toLowerCase());

      if (res_tech) {
          console.log('Exist that tech');
          // 2.0 YES
          // Get id_tech
          id_tech = res_tech.id;
      } else {
          console.log('New tech');
          // 2.1 No
          // Insert ind table tech the new tech
          // Get id of that tech
          const res_InsertNewTech = await insertNewTechDB(tech.toLowerCase());
          id_tech = res_InsertNewTech.insertId;
      }

      // id_tech = (res_tech) ? res_tech.id : await insertNewTechDB(tech.toLowerCase());

      // 4. Insert in table hackathon_tech (id_tech and id_hackathon)
      // tech.toLowerCase(),
      await insertNewHackathonTechDB(id_hackathon, id_tech);

  }

  module.exports = {
      auxInsertTech
  }