const dbGetPostById = require('../../db/select/getPostById')

const getPostById = async (req,res) => {

    const {id} = req.params

    try {
        result = await dbGetPostById(id)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = getPostById