const db = require('../../db/delete')

const deleteUser = async (req,res) => {

    const {id} = req.params

    try {
        info = await db.deleteUser(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(info)
}

module.exports = {
    deleteUser
}