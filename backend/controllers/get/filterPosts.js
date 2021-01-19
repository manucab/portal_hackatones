const db = require('../../db/select')

const filterPosts = async (req,res) => {

    const {filter} = req.params

    try {
        result = await db.filterPosts(filter)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = filterPosts