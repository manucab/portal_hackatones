// Variables and instances
require('dotenv').config();
const {getCodeUserDB} = require('../../db/db_Select');

const isCodeUser = async (req, res, next) => {

 // 1. Get code params
  const {code} = req.params;

 // 1.1 Check valid code

if( code.length !== parseInt(process.env.CODE_LEN) ) {
  console.log('Fail, code is no valid');
res.status(401).send();
return;
}


try{

  // 2. Check code in database
const codeDB = await  getCodeUserDB(code) ;

  // 3. if not  exist, res.status(401).send();
  if (codeDB[0].code !== code) {
      console.log('Fail, code no into db');
    res.status(401).send();
    return;
  }

  console.log('Code exist in database, ok');

// 4.
next(); // 5. Change status to true

}catch(e){
  console.log('Fail, code no into db');
  res.status(401).send();
  return;
}




}

module.exports = {isCodeUser};
