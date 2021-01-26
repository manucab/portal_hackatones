const db = require('../../db/delete')
const { getParticipation } = require('../../db/select')

const cancelHackathonBooking = async (req,res) => {

    const {idUser,idHackathon} = req.params

    try {

        const check = await getParticipation(idUser,idHackathon)
        const checked = check.length === 1 

        if (!checked) {
            res.status(401).send("Participation not found");
            return;
        } 
        
        result = await db.cancelHackathonBooking(idUser, idHackathon)
        

    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = cancelHackathonBooking
