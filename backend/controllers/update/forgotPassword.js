const db = require('../../db/update')

const forgotPassword = async (req,res) => {

    const {email} = req.body

    try {
        result = await db.rateHackathon(email)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = forgotPassword