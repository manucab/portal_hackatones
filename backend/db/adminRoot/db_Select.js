require('dotenv').config();
const { performQuery } = require('../performQuery');


const getCodeUserDB = async(code) => {

    const query = 'select * from competitor where code=?';

    const params = [code];

    const [result] = await performQuery(query, params);

    return result;
}


const getUserDB = async(email) => {

    const query = 'select * from competitor where email=?';

    const params = [email];

    const [result] = await performQuery(query, params);

    return result;
}

const getAllUsersDB = async() => {

    const query = 'select * from competitor';

    const params = [];

    const [result] = await performQuery(query, params);

    return result;
}

const getAdminDB = async(email) => {

    const query = 'select * from admin where email=?';

    const params = [email];

    const result = await performQuery(query, params);

    return result;
}

const getAllAdminsDB = async() => {

    const query = 'select * from admin';

    const params = [];

    const [result] = await performQuery(query, params);

    return result;
}


const getCodeAdminqDB = async(code) => {

    const query = 'select code from admin where code=?';

    const params = [code];

    const [result] = await performQuery(query, params);

    return result;
}

const getOrganizerDB = async(email) => {

    const query = 'select * from competitor where email=? and rol="organizer" ';

    const params = [email];

    const result = await performQuery(query, params);

    return result;
}

module.exports = {
    getUserDB,
    getCodeAdminqDB,
    getAdminDB,
    getAllUsersDB,
    getAllAdminsDB,
    getOrganizerDB,
    getCodeUserDB
}
