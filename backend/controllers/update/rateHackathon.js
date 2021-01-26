const db = require('../../db/update')
const isPossibleToRate = require('../../utils/isPossibleToRate')

const rateHackathon = async (req,res) => {

    const {rate} = req.body
    const {idUser,idHackathon} = req.params

    try {
        checked = await isPossibleToRate(idUser,idHackathon)
        if(!checked) {
            res.status(401).send("Participation not founded");
      return
        }

        result = await db.rateHackathon(idUser,idHackathon,rate)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = rateHackathon