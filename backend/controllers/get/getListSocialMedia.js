// Variables && instances
require('dotenv').config();
const {logger} = require("../../app/config/logger");

const fs = require('fs');

const getListSocialMedia = async (req, res) => {

    try {
        const testFolder = '../media/SocialMedia';

        let listSm = [];

        fs.readdirSync(testFolder).forEach(file => {
            listSm.push(file.slice(0, -4));
        });

        if (! listSm || listSm.length <= 0) 
            listSm = [];

        return res.json(listSm);

    } catch (e) {

        let msgError = ('Error get List of social media:', e.message);
        logger.error(msgError);
        return res.status(500).json({info: msgError});
    }

}

module.exports = {
    getListSocialMedia
}
