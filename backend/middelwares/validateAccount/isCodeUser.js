// Variables and instances
require('dotenv').config();
<<<<<<< HEAD
const {getCodeUserDB} = require('../../db/adminRoot/db_Select');
const {performQuery} = require('../../db/performQuery');
=======
const { getCodeUserDB } = require('../../db/adminRoot/db_Select');
const { logger } = require("../../app/config/logger");
const { performQuery } = require('../../db/performQuery');
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d

let query = '';
let params = [];

<<<<<<< HEAD
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
=======
const isCodeUser = async(req, res, next) => {

    // 1. Get code params
    const { code, id } = req.params;

    let msgInfo = '';

    // 1.1 Check valid code
    if (code.length !== parseInt(process.env.CODE_LEN) || parseInt(id) === undefined) {

        msgInfo = 'Fail, code is no valid';
        logger.info(msgInfo);
        return res.status(401).json({ info: msgInfo });
    }

    try {

        // Init transaction mysql
        query = 'start transaction';
        const resInitTransaction = await performQuery(query, params);
        logger.info(query);

        // 2. Check code in database
        const codeDB = await getCodeUserDB(code, parseInt(id));

        // 3. if not  exist, res.status(401).send();
        if (codeDB.code !== code || codeDB === undefined) {

            msgInfo = 'Fail, code no into db';
            logger.info(msgInfo);

            // Rollback mysql
            query = 'rollback';
            await performQuery(query, params);
            logger.info(query);

            // Send status
            return res.status(500).json({ info: msgInfo });
        }

        logger.debug('Code exist in database, ok');

        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info(query);

        // 4.
        next(); // 5. Change status to true

    } catch (e) {
        // Rollback mysql
        query = 'rollback';
        await performQuery(query, params);
        logger.info(query);


        let msgError = ('Error in  isCodeUser:', e.message);
        logger.error(msgError);
        return res.status(401).send(msgError);
    }
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d

}

module.exports = {
<<<<<<< HEAD
  isCodeUser
};
=======
    isCodeUser
};
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
