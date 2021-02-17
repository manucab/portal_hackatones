const { performQuery } = require('../db/performQuery');

const automaticUpdate = async () => {

    const queryHackathon = `update hackathon
    set hackathon_status = 'realizado'
    where end_date < now() and not hackathon_status = 'cancelado'`
    const queryCompetitorHackathon = `update competitor_hackathon a
    join hackathon b on a.id_hackathon = b.id 
    set a.inscription_status = 'asistente'
    where b.hackathon_status = 'realizado' and a.inscription_status = 'inscrito'`

    const params = []

    //Query to update hackathons
   const result1 =  await performQuery(queryHackathon,params)
    //Query to update competitor-hackathon
   const result2 =  await performQuery(queryCompetitorHackathon,params)

   return [result1,result2]

}

module.exports = {

    automaticUpdate
}