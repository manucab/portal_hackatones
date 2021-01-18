require('dotenv').config();
const { performQuery } = require('../../db/performQuery');

const registerNewUser = async(email,
    name,
    surname,
    register_date,
    professional_profile,
    rol, passwordEncrypt) => {


    console.log('name :>> ', name);


    const query = 'insert into competitor (email,user_name,surname,register_date,professional_profile,rol, user_password) values( ? , ? , ? , ? , ?, ?, ?)';

    const params = [email,
        name,
        surname,
        register_date,
        professional_profile,
        rol, passwordEncrypt
    ];

    console.log('params :>> ', params);
    console.log('query :>> ', query);

    const result = await performQuery(query, params);

    return result;
}

const registerNewAdmin = async(name, email, password, key_admin) => {

    const query = 'insert into admin (key_admin, name, email, password) values (?,?,?,?)';

    const params = [key_admin, name, email, password];

    const result = await performQuery(query, params);

    return result;
}



module.exports = {
    registerNewUser,
    registerNewAdmin
}