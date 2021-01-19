const db = require('../../db/update')
//const {hackathonValidator} = require('../../validators/hackathonValidator')

const modifyPost = async (req,res) => {

    const {title,content,publication_date,hidden} = req.body
    const {id} = req.params

    try {
        result = await db.modifyPost(id,title,content,publication_date,hidden)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = modifyPost