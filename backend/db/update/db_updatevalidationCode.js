// Variables & instances
require('dotenv').config();
const { performQuery } = require('../performQuery');

// Get user
const updateValidationCode = async(code, id) => {

    const query = 'update competitor set code=? where id=?';

    const params = [code, id];

    const result = await performQuery(query, params);

    return result;
}


module.exports = {
    updateValidationCode
}