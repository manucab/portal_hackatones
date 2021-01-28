require('dotenv').config();
const { performQuery } = require('../performQuery');

const resetAdminCode = async(code) => {

    const query = 'update admin set code="" where code=?';

    const params = [code];

    const [result] = await performQuery(query, params);

    return result;
}


const updateStateUser = async(id_user) => {

    const query = 'update competitor set active_user="true", code="" where id=?';

    const params = [id_user];

    const result = await performQuery(query, params);

    return result;
}



module.exports = {
    resetAdminCode,
    updateStateUser
}
