const {performQuery} = require("../performQuery")

const getProfileInfo = async (id) => {
    const queryProfile =
      "select * from competitor where id = ?";
  
    //Other option is have previous hackathons in a different variable then future hackathons
    const queryHackathonsParticipations = `select a.id ,a.hackathon_name, a.hackathon_place,a.city,a.hackathon_status,a.start_date, a.end_date,a.thematic,
      b.inscription_status, b.ranking,b.id_competitor,b.rate,group_concat(d.tech_name separator ',') as techs 
      from hackathon a 
      join competitor_hackathon b on a.id=b.id_hackathon
      join hackathon_tech c on c.id_hackathon = b.id_hackathon
      join tech d on d.id = c.id_tech
      where b.id_competitor= ? and not a.hackathon_status = 'cancelado'
      group by a.id`;
    
    const queryHackathonsCreated = `select a.id ,a.hackathon_name, a.hackathon_place,a.city,a.hackathon_status,a.start_date, a.end_date,a.thematic,
      group_concat(d.tech_name separator ',') as techs
      from hackathon a 
      join hackathon_tech b on b.id_hackathon = a.id
      join tech d on d.id = b.id_tech
      where a.id_organizer=? and not a.hackathon_status = 'cancelado'
      group by a.id`;
  
          
  
    const queryStats = `select count(*) participaciones,
          coalesce(round (avg(ranking),0),'Sin registros previos') puesto_medio,
          coalesce(min(ranking),'Sin registros previos') mejor_puesto  
          from competitor_hackathon a where a.id_competitor=? and a.inscription_status = 'asistente'`;
    const params = [id];
  
    const profile = await performQuery(queryProfile, params);
    const hackathonsParticipations = await performQuery(queryHackathonsParticipations, params);
    const hackathonsCreated = await performQuery(queryHackathonsCreated,params)
    const stats = await performQuery(queryStats, params);
  
    const result = [profile, hackathonsParticipations, hackathonsCreated, stats];
  
    return result;
  };


module.exports = getProfileInfo