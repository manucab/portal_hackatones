// Variables && instances
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginValidator } = require('../validators/validateLogin');
const {fieldsHackathons} =require('../validators/fieldsHackathon');
const { getUserDB } = require('../db/select');
const {createHackathonDB} = require('../db/Insert');


const login = async(req, res) => {

    // 1. Get params
    const { email, password } = req.body

    console.log('Email, password', email, password);

    try {

        // 2. Check if the parameters are valid
        const validParams = await loginValidator.validateAsync({ email, password });

        if (!validParams) {
            console.log('Error in valid params');
            res.status(401).send();
            return
        }

        // 3. If are valid, check if they are in the database
        const user = await getUserDB(email);

        console.info('UserDB:', user);

        // Not user in database --> failed
        if (user.length === 0) {
            console.log('!user', user);
            res.status(401).send();
            return;
        }

        // 4. Check password with bcrypt
        const db_password = user.password;
        const passwordIsvalid = await bcrypt.compare(password, db_password);

        // If not valid password --> failed
        if (!passwordIsvalid) {
            res.status(401).send()
            return
        }

        // info to put inside the token
        const tokenPayload = {
            email: user.email,
            rol: user.rol
        }

        console.log(tokenPayload);

        // 5. Generate token, expire in one day
        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });


        res.json({ token });
        console.log('Login OK');
    } catch (e) {
        console.log('Error login', e);
        res.status(401).send();
    }
}


const createHackathon = async(req, res) => {

    // 1. Get params
    const { place, city, start_date, end_date, id_organizer, hackathon_info } = req.body

    console.log(place, city, start_date, end_date, id_organizer, hackathon_info);

    try {

        // 2. Check if the parameters are valid
        /* Crear un validartor para comprobar q los input del hackathon nuevo son correctos */
                const validParams = await fieldsHackathons({ place });
            // if (!validParams) {
            //     console.log('Error in valid params');
            //     res.status(401).send();
            //     return
            // }

            // if the params are valid, then post into db the new hackathon
             await createHackathonDB(place, city, start_date, end_date, id_organizer, hackathon_info);

            console.log('Create new hackathon successfully');
            res.send('Create new hackathon successfully');

    } catch (e) {
            console.log('Error login', e);
            res.status(401).send();
    }
}


module.exports = {
    login,
    createHackathon
}
