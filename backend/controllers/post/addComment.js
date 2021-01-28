const dbAddComment = require('../../db/insert/addComment')


const addComment = async (req,res) => {

    const {idHackathon} = req.params
    //De momento pongo el id user en body pero supongo que lo cojerá de auth
    const {content,idUser} = req.body

    try {
        result = await dbAddComment(idHackathon,idUser,content)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = addComment