const db = require('../../db/select')

const profileInfo = async (req,res) => {

    const {id} = req.params

    try {
        info = await db.profileInfo(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(info)
}

module.exports = {
    profileInfo
}