// Variables && instances
require('dotenv').config();
const { logger } = require('../../app/config/logger');

const homePage = (req, res, error) => {


    // 1. Get params
    const { link } = req.body;

    console.log(link);

    console.log('Home Page');
    res.send('Home page');

}


module.exports = {
    homePage
}