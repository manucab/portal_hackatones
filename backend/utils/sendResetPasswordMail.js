const sendgrid = require('@sendgrid/mail')
const {schemaResetPassword} = require('../views/schemaResetPassword')

const sendResetPasswordMail = async (email,link) => {
    
    sendgrid.setApiKey(process.env.EMAIL_API_KEY)

    const message = {
        to:email,
        from: 'furboenvena10@gmail.com',
        subject: 'Reset your password',
        text: `La dirección de verificación es: ${link}`,
        html: schemaResetPassword(link)
    }

    await sendgrid.send(message)

}

module.exports = sendResetPasswordMail