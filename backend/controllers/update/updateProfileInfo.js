const db = require('../../db/update')

const updateProfileInfo = async (req,res) => {

    const {name,surname,email,professional_profile,rol} = req.body
    const {id} = req.params

    try {
        result = await db.updateProfileInfo(id,name ,surname, email, professional_profile, rol)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = updateProfileInfo