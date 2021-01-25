// Variables and instances
require('dotenv').config();
const {getCodeUserDB} = require('../../db/adminRoot/db_Select');
const {performQuery} = require('../../db/performQuery');

let query = '';
let params = [];

const isCodeUser = async (req, res, next) => {

  // 1. Get code params
  const {code} = req.params;

  // 1.1 Check valid code
  if (code.length !== parseInt(process.env.CODE_LEN)) {
    console.log('Fail, code is no valid');
    res.status(401).send();
    return;
  }

  try {

    // Init transaction mysql
     query = 'start transaction';
    const resInitTransaction = await performQuery(query, params);
    console.log('Start transaction');

    console.log('resInitTransaction',resInitTransaction);

    // 2. Check code in database
    const codeDB = await getCodeUserDB(code);

    console.log('codeDB[0].code', codeDB);

    // 3. if not  exist, res.status(401).send();
    if (codeDB.code !== code || codeDB === undefined) {
      console.log('Fail, code no into db');

      // Rollback mysql
      query = 'rollback';
      await performQuery(query, params);
      console.log('Rollback code not exist in db');

      // Send status
      res.status(401).send();
      return;
    }

    console.log('Code exist in database, ok');

    // 4.
    next(); // 5. Change status to true

  } catch (e) {
    console.log('Fail, isCodeUser', e);

    // Rollback mysql
    query = 'rollback';
    await performQuery(query, params);
    console.log('Rollback, fail in isCoder function');


    res.status(401).send();
    return;
  }

}

module.exports = {
  isCodeUser
};
