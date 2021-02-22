const {performQuery} = require("../performQuery")

const getProfileInfo = async (id) => {
    const queryProfile =
      "select * from competitor where id = ?";
  
    //Other option is have previous hackathons in a different variable than future hackathons
    const queryHackathonsParticipations = `select a.id ,a.hackathon_name, a.hackathon_place,a.city,a.hackathon_status,a.start_date, a.end_date,a.thematic,
      b.inscription_status, b.ranking,b.id_competitor,b.rate,group_concat(d.tech_name separator ',') as techs 
      from hackathon a 
      join competitor_hackathon b on a.id=b.id_hackathon
      join hackathon_tech c on c.id_hackathon = b.id_hackathon
      join tech d on d.id = c.id_tech
      where b.id_competitor= ? and not a.hackathon_status = 'cancelado' and not b.inscription_status = 'cancelado'
      group by a.id order by a.start_date desc`;
    
    const queryHackathonsCreated = `select a.id ,a.hackathon_name, a.hackathon_place,a.city,a.hackathon_status,a.start_date, a.end_date,a.thematic,
      group_concat(d.tech_name separator ',') as techs,
      round(avg(e.rate),1) as avg_rate,
      count(distinct e.id_competitor) as participants
      from hackathon a 
      join hackathon_tech b on b.id_hackathon = a.id
      join tech d on d.id = b.id_tech
      left join competitor_hackathon e on e.id_hackathon = a.id
      where a.id_organizer=? and not a.hackathon_status = 'cancelado'
      group by a.id order by a.start_date desc` ;
  
          
  
    const queryStats = `select count(*) participations,
          coalesce(round (avg(ranking),0),'-') avg_position,
          coalesce(min(ranking),'-') best_position  
          from competitor_hackathon a 
          where a.id_competitor=? and a.inscription_status = 'asistente'`;
    const params = [id];
  
    //Organizer stats

    const queryCreated = `select count(distinct id) created_hackathons from hackathon where id_organizer = ? and not hackathon_status = 'cancelado'`
    const queryAvgRate = `select round(avg(avg_rate_hackathon),1) organizer_avg_rate from(
      select round(avg(rate),1) avg_rate_hackathon from competitor_hackathon a
      join hackathon b on b.id = a.id_hackathon
      where b.id_organizer = ? and not b.hackathon_status = 'cancelado'
      group by a.id_hackathon) as avgs`
    const queryAvgParticipants = `select round((count(a.id_competitor)/count(distinct b.id)),0) avg_participants
      from competitor_hackathon a
      right join hackathon b on a.id_hackathon = b.id 
      where b.id_organizer = 2 and not a.inscription_status = 'cancelado'`
    
      
    
    const profile = await performQuery(queryProfile, params);
    const hackathonsParticipations = await performQuery(queryHackathonsParticipations, params);
    const hackathonsCreated = await performQuery(queryHackathonsCreated,params)
    const stats = await performQuery(queryStats, params);
    const organizerStats = [ await performQuery(queryCreated,params),
      await performQuery(queryAvgRate,params),
      await performQuery(queryAvgParticipants,params),]
  
  
    const result = [profile, hackathonsParticipations, hackathonsCreated, stats,organizerStats];
  
    return result;
  };


module.exports = getProfileInfo