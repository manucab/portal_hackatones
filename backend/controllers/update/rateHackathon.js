const db = require('../../db/update')

const rateHackathon = async (req,res) => {

    const {rate} = req.body
    const {idUser,idHackathon} = req.params

    try {
        info = await db.rateHackathon(idUser,idHackathon,rate)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(info)
}

module.exports = rateHackathon