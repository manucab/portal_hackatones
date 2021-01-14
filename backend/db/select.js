const performQuery = require("./performQuery")


const profileInfo = async (id) => {
  const queryProfile =
    "select user_name,surname,email,professional_profile,rol from competitor where id = ?";
  const queryHackathons = `select a.hackathon_name, a.hackathon_place,a.city,a.hackathon_status,a.start_date, a.end_date,
	    b.inscription_status, b.ranking,b.id_competitor,d.tech_name 
        from hackathon a 
        join competitor_hackathon b on a.id=b.id_hackathon
        join hackathon_tech c on c.id_hackathon = b.id_hackathon
        join tech d on d.id = c.id_tech
        where b.id_competitor=?`;

    const queryStats = `select count(*) participaciones,
        coalesce(round (avg(ranking),0),'Sin registros previos') puesto_medio,
        coalesce(min(ranking),'Sin registros previos') mejor_puesto  
        from competitor_hackathon a where a.id_competitor=?`
  const params = [id];

  const profile = await performQuery(queryProfile, params);
  const hackathones = await performQuery(queryHackathons, params);
  const stats = await performQuery(queryStats, params)

  result = [profile, hackathones, stats];

  return result;
};

module.exports = {
  profileInfo,
};
