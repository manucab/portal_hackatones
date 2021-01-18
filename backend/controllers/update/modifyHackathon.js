const db = require('../../db/update')
const {hackathonValidator} = require('../../validators/hackathonValidator')

const modifyHackathon = async (req,res) => {

    let {name,place,city,start_date,end_date,status,info} = req.body
    let {idHackathon,idUser} = req.params

    try {
        await hackathonValidator.validateAsync(req.body)
        info = await db.modifyHackathon(idUser,idHackathon,name,place,city,start_date,end_date,status,info)
    } catch (e) {
        console.log(e)
        res.send(e.message)
        return
    }
    res.send(info)
}

module.exports = modifyHackathon