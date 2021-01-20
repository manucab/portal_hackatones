const db = require('../../db/update')
const postValidator = require('../../validators/postValidator')

const modifyPost = async (req,res) => {

    const {title,content,publication_date,hidden} = req.body
    const {id} = req.params

    try {
        await postValidator.validateAsync(req.body)
        result = await db.modifyPost(id,title,content,publication_date,hidden)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = modifyPost