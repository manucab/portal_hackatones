const dbDeletePost = require('../../db/delete/deletePost')

const deletePost = async (req,res) => {

    const {id} = req.params

    try {
        result = await dbDeletePost(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = deletePost