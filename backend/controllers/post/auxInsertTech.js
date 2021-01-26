  // Variables && instances
  require('dotenv').config();
  const { getTechDB } = require('../../db/select/getTech');
  const { insertNewTechDB } = require('../../db/insert/insertNewTech');
  const { insertNewHackathonTechDB } = require('../../db/insert/insertNewHackathonTech');

  const auxInsertTech = async(tech, id_hackathon) => {

      let id_tech = [];
      let params = [];
      let id_exist = [];
      let id_notExist = tech;

      // tech --> array de las tech que llegan
      // params --> tamaño del array --> mismo numero de ? en params

      // Obtenemos el numero de parametros para la query
      tech.forEach(item => { params.push('?') });
      // params.join() --> convertimos un array en un string separado por comas

      id_exist = await getTechDB(tech, params.join());


      if (id_exist.length < tech.length) {

          id_exist.forEach((item, index_exist) => {
              let nameTech = item.tech_name;
              let index_notExist = id_notExist.indexOf(nameTech);
              id_notExist.splice(index_notExist, 1);
          });


          params = [];

          // Obtenemos el numero de parametros para la query
          id_notExist.forEach(item => { params.push('(?)') });

          // Get id of that tech
          const { affectedRows, insertId } = await insertNewTechDB(id_notExist, params.join());

          for (let j = 0; j < affectedRows; j++) {

              let id_new = insertId + j;
              id_tech.push(id_new);
          }


      }

      //s   plus id exist

      id_exist.forEach(item => {
          id_tech.push(item.id);
      });



      //   // 4. Insert in table hackathon_tech (id_tech and id_hackathon)

      // Ordenamos el array de menor a mayor
      id_tech = id_tech.sort((a, b) => a - b);

      params = id_tech.map(item => '(?,?)');

      let valuesTech = [];

      id_tech.forEach(item => {
          valuesTech.push(id_hackathon, item);
      });

      await insertNewHackathonTechDB(valuesTech, params.join());


  }

  module.exports = {
      auxInsertTech
  }