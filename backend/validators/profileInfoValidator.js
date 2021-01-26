const Joi = require("joi");

const profileInfoValidator = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .error(new Error("name should be a string between 2 and 50 characters")),

  surname: Joi.string()
    .min(2)
    .max(50)
    .error(new Error("surname should be a string between 2 and 50 characters")),

  email: Joi.string().email().error(new Error("wrong email format")),

  professional_profile: Joi.date()
    .valid("desarrollador", "diseñador", "marketing", "otro")
    .error(new Error("Personal Profile should be desarrollador, diseñador ,marketing or otro")),
  rol: Joi.date()
    .valid("user", "organizer")
    .error(new Error("Error rol value should be user or organizer")),
  newPassword: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
    .error(new Error("The Password must have 8 caracters min.")),
  passwordConfirmation: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,16}$"))
    .error(new Error("Password must have 8 caracters min.")),
  currentPassword: Joi.string()
    ,
});

module.exports = profileInfoValidator;
