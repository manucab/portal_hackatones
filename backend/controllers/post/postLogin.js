// Variables && instances
require('dotenv').config();
const jwt = require('jsonwebtoken');
const utils = require('../../utils/utils');
const cryptoRandomString = require('crypto-random-string');


const login = async(req, res) => {

    // 1. Get params
    const { email, password } = req.body
    const rol = req.rol;
    const state = req.state;
    const id = req.id;

    try {
        // 1.1 NO --> envio email ACTIVE ACCOUNT

        if (state === 'true') {

            // info to put inside the token
            const tokenPayload = {
                email: email,
                rol: rol
            }

            // 5. Generate token, expire in 2 day
            const token = jwt.sign(tokenPayload, process.env.SECRET, { expiresIn: '2d' });

            res.json({ token });
            console.log('Login OK');
        } else {

            // Generate code for url validation
            const validationCode = cryptoRandomString({ length: parseInt(process.env.CODE_LEN), type: 'alphanumeric' });
            // 4. Send email to confirm count
            let link = `http://${process.env.PUBLIC_DOMAIN}/user/validate/${id}/${validationCode}`;
            await utils.sendConfirmationMail(email, link);

            console.log('Your account is not validated yet. We have sent you an email');
            res.send('Your account is not validated yet. We have sent you an email');
        }


    } catch (e) {
        console.log('Error login', e);
        res.status(401).send();
    }
}


module.exports = {
    login
}