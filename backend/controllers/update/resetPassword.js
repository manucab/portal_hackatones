const dbResetPassword = require('../../db/update/resetPassword')
const jwt = require('jsonwebtoken')
const passwordValidator = require('../../validators/passwordValidator')
//const getToken = require('../../db/select/getToken')
//Hablar con Carlos por si no es necesario almacenar el token en la base de datos

const removeToken = require('../../db/update/removeToken')

const resetPassword = async (req,res) => {

    const {token} = req.params
    const {newPassword, confirmPassword} = req.body

    try {

    await passwordValidator.validateAsync(req.body);

    //Check link token === db token
    const decodedToken = jwt.verify(token,process.env.JWT_RESET_PASSWORD)
    const email = decodedToken.email  
    
    if(!email){
        res.status(400).send('Token error')
    }

    if(newPassword !== confirmPassword){
        res.status(409).send('Password confirmation failed')
    }

    result = await dbResetPassword(newPassword,email)
    await removeToken(email)
    
   
    res.send(result)
        
    } catch (e) {
        res.send(e.message)
    }

}

module.exports = resetPassword