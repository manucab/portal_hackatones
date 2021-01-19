const db = require('../../db/delete')

const cancelHackathonBooking = async (req,res) => {

    const {idUser,idHackathon} = req.params

    try {
        result = await db.cancelHackathonBooking(idUser, idHackathon)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = cancelHackathonBooking
