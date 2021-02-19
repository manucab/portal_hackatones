// Variables & instances
require('dotenv').config();
const { performQuery } = require('./performQuery');

// Get user
const getUserDB = async(email) => {

    const query = 'select * from competitor where email=?';

    const params = [email];

    const [result] = await performQuery(query, params);

    return result;
}

// Get hackaton info by some filters
const getHackathonInfoDB = async(id, hackathon_place, city, start_date, end_date, thematic) => {

    const query = `select hackathon.*,

    CAST( CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('comment', t.content,'user', c.user_name)),']') AS JSON ) as comment,

    CAST( CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('tech', d.tech_name)),']') AS JSON ) as techs,
    
    CAST( CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('url', l.url,'web_name', l.web_name)),']') AS JSON ) as link


    from hackathon

    LEFT join comment t on t.id_hackathon = hackathon.id
    LEFT join competitor c on c.id = t.id_competitor
    LEFT join hackathon_tech b on b.id_hackathon = hackathon.id
    LEFT join tech d on d.id = b.id_tech
    LEFT join hackathon_link hl on hl.id_hackathon = hackathon.id
    LEFT join link l on l.id = hl.id_link

    where 
    
    (hackathon.id = ? or ? is null)
    and (hackathon_place = ? or ? is null )
    and (city = ? or ? is null)
    and (start_date >= ? or ?  is null)
    and (end_date <=? or ? is null)
    and (thematic = ? or ? is null)

    group by hackathon.id
    order by hackathon.id`;

      params = [
        id,
        id,
        hackathon_place,
        hackathon_place,
        city,
        city,
        start_date,
        start_date,
        end_date,
        end_date,
        thematic,
        thematic
    ];

    const result = await performQuery(query, params);

    return result;

}

module.exports = {
    getUserDB,
    getHackathonInfoDB
}