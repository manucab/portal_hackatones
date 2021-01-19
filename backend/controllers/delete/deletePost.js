const db = require('../../db/delete')

const deletePost = async (req,res) => {

    const {id} = req.params

    try {
        result = await db.deletePost(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = deletePost