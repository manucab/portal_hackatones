const db = require('../../db/delete')

const deleteHackathon = async (req,res) => {

    const {idUser,idHackathon} = req.params

    try {
        result = await db.deleteHackathon(idUser, idHackathon)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = deleteHackathon