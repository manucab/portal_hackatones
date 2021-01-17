require('dotenv').config();
const { performQuery } = require('../performQuery');

const resetAdminCode = async(code) => {

    const query = 'update admin set code="" where code=?';

    const params = [code];

    const [result] = await performQuery(query, params);

    return result;
}

module.exports = {
    resetAdminCode
}