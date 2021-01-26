const dbAddPost = require('../../db/insert/addPost')
const postValidator = require('../../validators/postValidator')


const addPost = async (req,res) => {

    const {title,content,publication_date} = req.body

    try {
        await postValidator.validateAsync(req.body)
        result = await dbAddPost(title,content,publication_date)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = addPost