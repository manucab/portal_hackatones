  // Variables && instances
  require('dotenv').config();
  const { getTechDB } = require('../../db/select/getTech');
  const { insertNewTechDB } = require('../../db/insert/insertNewTech');
  const { insertNewHackathonTechDB } = require('../../db/insert/insertNewHackathonTech');

  const auxInsertLink = async() => {



  }


  module.exports = {
      auxInsertLink
  }