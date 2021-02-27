const dbRateHackathon = require('../../db/update/rateHackathon')
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

        result = await dbRateHackathon(idUser,idHackathon,rate)
    } catch (e) {
        res.status('304').send(e.message)
        return
    }
    res.send(result)
}

module.exports = rateHackathon