const dbDeleteHackathon = require('../../db/delete/deleteHackathon')

const deleteHackathon = async (req,res) => {

    const {idUser,idHackathon} = req.params

    try {
        result = await dbDeleteHackathon(idUser, idHackathon)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = deleteHackathon