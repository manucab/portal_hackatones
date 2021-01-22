// Variables && instances
require('dotenv').config();
const { getHackathonInfoDB } = require('../../db/select');

const getHackathonByFilters = async(req, res) => {

    let msgResponse = [];

    // 1. Get parameters of req.query
    const {
        hackathon_place,
        city,
        start_date,
        end_date,
        technologies,
        thematic
    } = req.query;

    const { id } = req.params;

    console.log(id);

    console.log(id, hackathon_place, city, start_date, end_date, technologies, thematic);

    // 1.0 Check the parameters are valid????

    try {
        //  2. Search parameters -> {hackathon_place, city,start_date, end_date, technologies,thematic }
        const result = await getHackathonInfoDB(id, hackathon_place, city, start_date, end_date /*, technologies */ , thematic);
        console.log('Result', result);

        if (!result) {
            msgResponse = { Info: 'No result found' }
        } else {

            result.forEach(item => {
                msgResponse.push({
                    hackathon_place: item.hackathon_place,
                    city: item.city,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    thematic: item.thematic
                });
            })

        }

        // 2. send result json
        res.json(msgResponse);

    } catch (e) {
        console.log('Error get hackathon info', e);
        res.status(500).send('Error');
    }

}

module.exports = {
    getHackathonByFilters
}