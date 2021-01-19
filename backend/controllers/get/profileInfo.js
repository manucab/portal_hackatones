const db = require('../../db/select')

const profileInfo = async (req,res) => {

    const {id} = req.params

    try {
        result = await db.profileInfo(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = profileInfo