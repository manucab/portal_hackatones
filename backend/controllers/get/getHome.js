// Variables && instances
require('dotenv').config();
const { logger } = require('../../app/config/logger');

const homePage = (req, res, error) => {

    console.log('Home Page');
    res.send('Home page');

}


module.exports = {
    homePage
}