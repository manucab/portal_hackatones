const dbFilterPosts = require('../../db/select/filterPosts')

const filterPosts = async (req,res) => {

    const {filter} = req.params

    try {
        result = await dbFilterPosts(filter)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = filterPosts