// Variables && instances
const {getCodeUserDB} = require('../db/adminRoot/db_Select');
const {updateStateUser} = require('../db/adminRoot/db_update');
const { performQuery } = require('../db/performQuery');

let query = '';
let params = [];

const activeUser = async (req, res) => {

  // 1. Get code params
  const {code} = req.params;

  try {

    // 1. Get the user who has that code
    const userDB = await getCodeUserDB(code);

    console.log('activeUser user',userDB.id);



    if (!userDB) {
      console.log('Fail, user no into db');

      // Rollback mysql
      query = 'rollback';
      await performQuery(query, params);
      console.log('Rollback not userDB');

      res.status(401).send();
      return;
    }

    // 2.1 change state to true and reset code
    await updateStateUser(userDB.id);

    console.log('Update state is successfully');

    // Commit mysql
    query = 'commit';
    await performQuery(query, params);
    console.log('Commit');

    res.send('Update state is successfully');

  } catch (e) {
    console.log('error in activeUser', e);

    // Rollback mysql
    query = 'rollback';
    await performQuery(query, params);
    console.log('Rollback, error in activeUser( function)');

    res.status(401).send();
    return;
  }

}

module.exports = {
  activeUser
};
