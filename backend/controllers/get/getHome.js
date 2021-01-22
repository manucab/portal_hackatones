// Variables && instances
require('dotenv').config();

const homePage = (req, res) => {

    console.log('Home Page');
    res.send('Home page');

}


module.exports = {
    homePage
}