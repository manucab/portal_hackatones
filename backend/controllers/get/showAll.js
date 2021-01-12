const db = require('../../db/select')

const showAll = async (req,res) => {
    try {
        users = await db.showAll()
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(users)
}

module.exports = {
    showAll
}