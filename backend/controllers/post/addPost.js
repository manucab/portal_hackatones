const db = require('../../db/update')

const addPost = async (req,res) => {

    const {title,content,publication_date} = req.body

    try {
        result = await db.insertPost(title,content,publication_date)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = addPost