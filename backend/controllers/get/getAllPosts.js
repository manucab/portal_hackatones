const dbGetAllPosts = require('../../db/select/getAllPosts')

const getAllPosts = async (req,res) => {


    try {
        result = await dbGetAllPosts()
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = getAllPosts