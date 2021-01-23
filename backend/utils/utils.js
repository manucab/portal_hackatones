const sendgrid = require("@sendgrid/mail");
const { schemaValidateAccount } = require('../views/schemaValidateAccount');

const sendConfirmationMail = async(email, link) => {
    // Api_key sendgrip
    sendgrid.setApiKey(process.env.EMAIL_API_KEY);

    const message = {
        to: email,
        from: 'furboenvena10@gmail.com',
        subject: 'Validate your account',
        text: `La dirección de verificación es: ${link}`,
        html: schemaValidateAccount(email, link),
    };

    // Send message
    await sendgrid.send(message);
}

module.exports = {
    sendConfirmationMail
}