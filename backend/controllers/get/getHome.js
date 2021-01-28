// Variables && instances
require('dotenv').config();
const { logger } = require('../../app/config/logger');

const homePage = (req, res, error) => {

    let msgInfo = 'Home page';

    logger.info(msgInfo);
    res.json({ info: msgInfo });
}


module.exports = {
    homePage
}