const dbDeleteComment = require('../../db/delete/deleteComment')

const deleteComment = async (req,res) => {

    const {idComment} = req.params

    try {
        result = await dbDeleteComment(idComment)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = deleteComment