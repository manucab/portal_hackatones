require('dotenv').config();
const {  logger} = require("../../app/config/logger");
const {  val_statusInscription} = require('../../validators/val_statusInscription');
const {insertNewParticipation} = require('../../db/insert/insertNewParticipation');
const utils = require('../../utils/utils');
const cryptoRandomString = require('crypto-random-string');
const { performQuery } = require('../../db/performQuery');

/* Create a new hackathon*/
const enrollHackathon = async (req, res) => {

  // 1. Get params
  const {
    inscription_status
  } = req.body

  const {
    id_hackathon
  } = req.params
  const {id, email}= req.auth;

  const id_competitor  = id;

  let query = '';
  let params = [];

  try {

    // 2. Check if parameter are valid
    await val_statusInscription.validateAsync({  inscription_status  });

    logger.debug('Validate fields ok!!');

    //Start transaction mysql
    query = 'start transaction';
    await performQuery(query, params);
    logger.info('Init transaction query');

    // 4. Generate booking code for send emai
    // Generate code for url validation
    const id_booking = cryptoRandomString({ length: parseInt(process.env.BOOKING_CODE_LEN), type: 'alphanumeric' });


console.log(id_competitor, id_hackathon, inscription_status, id_booking);

    // 3. insert into db new participation hackathon
await insertNewParticipation(id_competitor, id_hackathon, inscription_status, id_booking);

    // 5. Send email with boooking code and other info of hackathon
    await utils.sendCodeBooking(email, id_booking);

    // Commit mysql
    query = 'commit';
    await performQuery(query, params);
    logger.info(query);

    let msgInfo = 'Register in hackathon sucessfull';

    logger.debug(msgInfo);
    res.json(msgInfo);
  } catch (e) {

    // Something wrong --> Rollback
    query = 'rollback';
    await performQuery(query, params);
    logger.info('Rollback query');

    let msgError = ` Error in enrroll a hackathon: ${e.message} `;
    logger.error(msgError);
    res.status(500).json({
      info: msgError
    });
  }
}

module.exports = {
  enrollHackathon
}
