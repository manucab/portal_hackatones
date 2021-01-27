const dbResetPassword = require('../../db/update/resetPassword')
const jwt = require('jsonwebtoken')
//const getToken = require('../../db/select/getToken')
//Hablar con Carlos por si no es necesario almacenar el token en la base de datos

const removeToken = require('../../db/update/removeToken')

const resetPassword = async (req,res) => {

    const {token} = req.params
    const {newPassword} = req.body

    //Check link token === db token
    const decodedToken = jwt.verify(token,process.env.JWT_RESET_PASSWORD)
    const email = decodedToken.email  
    
    if(!email){
        res.status(400).send('Token error')
    }

    result = await dbResetPassword(newPassword,email)
    await removeToken(email)
    
   
    res.send()
}

module.exports = resetPassword