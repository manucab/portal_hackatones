require('dotenv').config();
const { performQuery } = require('../../db/performQuery');

const registerNewUser = async(code, name, email, password) => {

    const query = 'insert into user (code, name, email, password) values (?,?,?,?)';

    const params = [code, name, email, password];

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