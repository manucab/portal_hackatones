const db = require('../../db/update')
const profileInfoValidator = require('../../validators/profileInfoValidator')

const updateProfileInfo = async (req,res) => {

    const {name,surname,email,professional_profile,rol} = req.body
    const {id} = req.params

    try {
        await profileInfoValidator.validateAsync(req.body)
        result = await db.updateProfileInfo(id,name ,surname, email, professional_profile, rol)
    } catch (e) {
        res.send(e.message)
        return
    }
    res.send(result)
}

module.exports = updateProfileInfo