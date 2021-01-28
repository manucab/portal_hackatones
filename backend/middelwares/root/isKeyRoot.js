// Variables && instances
require('dotenv').config();
const key_root = process.env.ROOT_KEY_INIT;
<<<<<<< HEAD
const iskeyRoot = (req,res, next) => {

// Get params
  const {key} = req.params;

// Check key with key_root in .envs
  (key === key_root) ? next() :   res.status(406).send('Key not valid');
=======

const iskeyRoot = (req, res, next) => {

    // Get params
    const { key } = req.params;

    // Check key with key_root in .envs
    (key === key_root) ? next(): res.status(406).send('Key not valid');
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d

}

module.exports = {
<<<<<<< HEAD
  iskeyRoot
}
=======
    iskeyRoot
}
>>>>>>> 24aa97d05ce9b694816e4dc53b11ee67711dd25d
