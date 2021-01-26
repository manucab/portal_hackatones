const dbCancelHackathonBooking = require('../../db/delete/cancelHackathonBooking')
const getParticipation = require('../../db/select/getParticipation')
const cancelHackathonBooking = async (req,res) => {

    const {idUser,idHackathon} = req.params

    try {

        const check = await getParticipation(idUser,idHackathon)
        const checked = check.length === 1 

        if (!checked) {
            res.status(401).send("Participation not found");
            return;
        } 
        
        result = await dbCancelHackathonBooking(idUser, idHackathon)
        

    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = cancelHackathonBooking
