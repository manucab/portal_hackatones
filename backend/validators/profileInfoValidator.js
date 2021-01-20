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

  email: Joi.string()
    .email()
    .error(new Error("wrong email format")),

  professional_profile: Joi.date()
    .valid("desarrollador", "diseñador", "marketing", "otro")
    .error(new Error("Error wrong value")),
  rol: Joi.date()
    .valid("user", "organizer")
    .error(new Error("Error wrong value")),
});

module.exports = profileInfoValidator;
