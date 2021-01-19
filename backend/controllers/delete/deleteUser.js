const db = require('../../db/delete')

const deleteUser = async (req,res) => {

    const {id} = req.params

    try {
        result = await db.deleteUser(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = deleteUser