const dbModifyComment = require('../../db/update/modifyComment')

const modifyComment = async (req,res) => {

    const {idComment} = req.params
    const {content} = req.body

    try {
        result = await dbModifyComment(idComment,content)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = modifyComment