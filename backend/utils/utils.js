const sendgrid = require("@sendgrid/mail");
const { schemaValidateAccount } = require('../views/schemaValidateAccount');

const sendConfirmationMail = async(email, link) => {
    // Api_key sendgrip
    sendgrid.setApiKey(process.env.EMAIL_API_KEY);

    // TODO -- Change from email

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


const sendCodeBooking = async(email, code) => {
    // Api_key sendgrip
    sendgrid.setApiKey(process.env.EMAIL_API_KEY);

    // TODO -- Change from email, and change schema

    const message = {
        to: email,
        from: 'furboenvena10@gmail.com',
        subject: 'Te has inscrito en un hackathon!',
        text: `El código de reseva es:: ${code}`,
        html: schemaValidateAccount(email, code),
    };

    // Send message
    await sendgrid.send(message);
}


module.exports = {
    sendConfirmationMail,
    sendCodeBooking
}
