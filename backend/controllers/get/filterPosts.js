const db = require('../../db/select')

const filterPosts = async (req,res) => {

    const {filter} = req.params

    try {
        info = await db.filterPosts(filter)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(info)
}

module.exports = filterPosts