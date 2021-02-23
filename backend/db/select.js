// Variables & instances
require('dotenv').config();
const {performQuery} = require('./performQuery');

// Get user
const getUserDB = async (email) => {

    const query = 'select * from competitor where email=?';

    const params = [email];

    const [result] = await performQuery(query, params);

    return result;
}

// Get hackaton info by some filters
const getHackathonInfoDB = async (id, hackathon_place, city, start_date, end_date, thematic,tech) => {

    const user = `JSON_OBJECT('name', c.user_name, 'surname', c.surname, 'id', c.id, 'isActive', c.active_user, 'register-date',c.register_date, 'email', c.email, 'profeesional-profile', c.professional_profile,
    'rol', c.rol, 'idDeleted', c.deleted_user, 'avatar',c.profile_picture, 'creation-date', c.creation_date, 'last-update', c.last_update)`;

    const organizer = `JSON_OBJECT('name', cc.user_name, 'surname', cc.surname, 'id', cc.id, 'isActive', cc.active_user, 'register-date',cc.register_date, 'email', cc.email, 'profeesional-profile', cc.professional_profile,
    'rol', cc.rol, 'idDeleted', cc.deleted_user, 'avatar',cc.profile_picture, 'creation-date', cc.creation_date, 'last-update', cc.last_update)`;

    const query = `select hackathon.*,

    CAST( CONCAT('[',  GROUP_CONCAT(DISTINCT  IF(c.id is not null,JSON_OBJECT('comment', t.content,'user',${user}), null)),']') AS JSON ) as comment,

    CAST( CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('tech', d.tech_name)),']') AS JSON ) as techs,
    
    CAST( CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('url', l.url,'web_name', l.web_name)),']') AS JSON ) as link,

    CAST( CONCAT('[', GROUP_CONCAT(DISTINCT JSON_OBJECT('organizer', ${organizer})),']') AS JSON ) as organizer

    from hackathon

    left join competitor cc on cc.id = hackathon.id_organizer

    LEFT join comment t on t.id_hackathon = hackathon.id
    LEFT join competitor c on c.id = t.id_competitor
    LEFT join hackathon_tech b on b.id_hackathon = hackathon.id
    LEFT join tech d on d.id = b.id_tech
    LEFT join hackathon_link hl on hl.id_hackathon = hackathon.id
    LEFT join link l on l.id = hl.id_link

    where 
    
    (hackathon.id = ? or ? is null)
    and (hackathon.hackathon_place = ? or ? is null )
    and (hackathon.city = ? or ? is null)
    and (hackathon.start_date >= ? or ?  is null)
    and (hackathon.end_date <=? or ? is null)
    and (hackathon.thematic = ? or ? is null)
    and (d.tech_name = ? or ? is null)

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
        thematic,
        tech,
        tech
    ];

    const result = await performQuery(query, params);

    return result;

}

module.exports = {
    getUserDB,
    getHackathonInfoDB
}
