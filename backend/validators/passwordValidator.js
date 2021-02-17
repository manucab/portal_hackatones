const Joi = require('joi');

const passwordValidator = Joi.object({
    newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
    .error(new Error("The Password must have 8 caracters min.")),
    confirmPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
    .error(new Error("The Password must have 8 caracters min.")),

})

module.exports = passwordValidator
