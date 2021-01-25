const performQuery = require("./performQuery");

const profileInfo = async (id) => {
  const queryProfile =
    "select user_name,surname,email,professional_profile,rol from competitor where id = ?";

  //Other option is have previous hackathons in a different variable then future hackathons
  const queryHackathons = `select a.hackathon_name, a.hackathon_place,a.city,a.hackathon_status,a.start_date, a.end_date,
	    b.inscription_status, b.ranking,b.id_competitor,b.rate,d.tech_name 
        from hackathon a 
        join competitor_hackathon b on a.id=b.id_hackathon
        join hackathon_tech c on c.id_hackathon = b.id_hackathon
        join tech d on d.id = c.id_tech
        where b.id_competitor=? and not a.hackathon_status = 'cancelado'`;

  const queryStats = `select count(*) participaciones,
        coalesce(round (avg(ranking),0),'Sin registros previos') puesto_medio,
        coalesce(min(ranking),'Sin registros previos') mejor_puesto  
        from competitor_hackathon a where a.id_competitor=? and a.inscription_status = 'asistente'`;
  const params = [id];

  const profile = await performQuery(queryProfile, params);
  const hackathons = await performQuery(queryHackathons, params);
  const stats = await performQuery(queryStats, params);

  const result = [profile, hackathons, stats];

  return result;
};

const filterPosts = async (filter) => {
  const wordsInFilter = filter.trim().split(" ").length;

  if (wordsInFilter === 1) {
    const query = `select * from post where hidden = 'false'
      and title like ? 
      or content like ?`;
    const params = [`%${filter}%`, `%${filter}%`];

    console.log(query);

    const result = await performQuery(query, params);
    return result;
  } else if (wordsInFilter > 1) {
    const query = `SELECT  * , MATCH (title,content) AGAINST (?) AS puntuacion
    FROM post WHERE  MATCH (title, content) AGAINST (?)
    ORDER  BY puntuacion DESC LIMIT 50;`;
    const params = [filter, filter];

    const result = await performQuery(query, params);
    return result;
  }
};

const getUserDB = async (email) => {
  const query = "select * from competitor where email=?";

  const params = [email];

  const [result] = await performQuery(query, params);

  return result;
};

const getUsersIdDB = async () => {
  const query = "select id from competitor";

  const idsObjectArray = await performQuery(query);
  const result = idsObjectArray.map((id) => id.id);
  return result;
};

module.exports = {
  profileInfo,
  filterPosts,
  getUserDB,
  getUsersIdDB,
};
