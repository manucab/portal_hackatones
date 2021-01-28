// Variables && instances
require('dotenv').config();
const { logger } = require("../../app/config/logger");
const { getHackathonInfoDB } = require('../../db/select');
const { getLinksDB } = require('../../db/select/getLinks');
const { getListLinkByHackathonDB } = require('../../db/select/getListLinkByHackathon');
const { getListTechByHackathonDB } = require('../../db/select/getListTechByHackathon');
const { performQuery } = require('../../db/performQuery');

const getHackathonByFilters = async(req, res) => {

    let msgResponse = [];
    let query = '';
    let params = [];

    // 1. Get parameters of req.query
    const {
        hackathon_place,
        city,
        start_date,
        end_date,
        thematic,
        tech
    } = req.query;

    const { id } = req.params;

    // 1.0 Check the parameters are valid????
    // TODO -- valide params !!!

    try {

        // Fucntion for prepara string query mysql, amoung of values as ? or a pair (?,?)
        const getParams = (len, format) => Array(len).fill(`${format}`).join();


        //Start transaction mysql
        query = 'start transaction';
        await performQuery(query, params);
        logger.info('Init transaction query');

        //  2. Search parameters -> {hackathon_place, city,start_date, end_date, technologies,thematic }
        const listHackathons = await getHackathonInfoDB(id, hackathon_place, city, start_date, end_date, thematic);

        let listIdHackathons = listHackathons.map(item => item.id);


        if (!listHackathons || listHackathons.length <= 0) {
            msgResponse = { Info: 'No result found' };
        } else {

            // Prepare query (id_hackathon, id_link)
            params = getParams(listIdHackathons.length, '?');
            // 1. Search in table hackathon_link and get id of links
            let resLinks = await getListLinkByHackathonDB(listIdHackathons, params);

            // 2. Search in table hackathon_tech and get id of tech
            let resTechs = await getListTechByHackathonDB(listIdHackathons, params);

            listHackathons.forEach(item => {
                let listLinkInfo = resLinks.filter(info => info.id_hackathon === item.id).map(element => ({ url: element.url, web_name: element.web_name }));
                let listTechInfo = resTechs.filter(info => info.id_hackathon === item.id).map(element => (element.tech_name));

                if (listLinkInfo)(item['link'] = listLinkInfo)
                if (listTechInfo)(item['tech'] = listTechInfo)

            });

            let hackathon = [];

            // Filter of technologies
            if (tech) {
                hackathon = listHackathons.filter(item => item['tech'].includes(tech));
            } else {
                hackathon = [...listHackathons];
            }

            // Format data hackathon...
            hackathon.forEach(item => {
                msgResponse.push({
                    hackathon_place: item.hackathon_place,
                    city: item.city,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    hackathon_status: item.hackathon_status,
                    hackathon_info: item.hackathon_info,
                    thematic: item.thematic,
                    link: item.link || 'not info',
                    tech: item.tech || 'not info'
                });


            })

        }



        // Commit mysql
        query = 'commit';
        await performQuery(query, params);
        logger.info('Commit');

        // 2. send result json
        res.json(msgResponse);

    } catch (e) {

        console.log(e);
        // Something wrong --> Rollback
        query = 'rollback';
        await performQuery(query, params);
        logger.error('Rollback query');

        logger.error('Error get hackathon info', e);
        res.status(500).send('Error');
    }

}

module.exports = {
    getHackathonByFilters
}