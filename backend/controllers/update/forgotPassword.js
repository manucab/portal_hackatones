require('dotenv').config()
const checkEmail = require('../../utils/checkEmail')
const dbForgotPassword = require('../../db/update/forgotPassword')
const jwt = require('jsonwebtoken')
const sendResetPasswordMail = require('../../utils/sendResetPasswordMail')

const forgotPassword = async (req,res) => {

    const {email} = req.body

    const emailCheck = await checkEmail(email)

    if(!emailCheck[0]) {
        res.status(401).send('Email not found. Try to register or activate your account')
        return
    }

    const token = jwt.sign({email},process.env.JWT_RESET_PASSWORD,{expiresIn:'15m'})
    
    const link = `http://${process.env.PUBLIC_DOMAIN}/forgot-password/reset-password/${token}`

    
    await dbForgotPassword(token,email)


    await sendResetPasswordMail(email,link)


    res.send(`Mensaje enviado este es tu codigo token ${token}`)

}

module.exports = forgotPassword