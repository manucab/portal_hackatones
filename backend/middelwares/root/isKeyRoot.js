// Variables && instances
require('dotenv').config();
const key_root = process.env.ROOT_KEY_INIT;
const iskeyRoot = (req, res, next) => {

    // Get params
    const { key } = req.params;

    // Check key with key_root in .envs
    (key === key_root) ? next(): res.status(406).send('Key not valid');

}

module.exports = {
    iskeyRoot
}