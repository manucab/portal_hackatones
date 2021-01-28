const Joi = require('joi');

const val_register = Joi.object({

    email: Joi.string().lowercase().trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .error(
            new Error('Email must have the following structure: name@xxxx.[com, es, net]')
        ),
    name: Joi.string().lowercase().trim()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .error(
            new Error('The name entered is not valid')
        ),

    surname: Joi.string() //.lowercase().trim()
        //.alphanum()
        .min(3)
        .max(30)
        .required()
        .error(
            new Error('The surname entered is not valid')
        ),


    professional_profile: Joi.string().lowercase().trim()
        .alphanum()
        .min(3)
        .max(30)
        .valid("desarrollador", "diseñador", "marketing", "otro")
        .required()
        .error(
            new Error('The professional profile entered is not valid')
        ),


    rol: Joi.string().lowercase().trim()
        .alphanum()
        .min(3)
        .max(30)
        .valid("user", "organizer")
        .required()
        .error(
            new Error('The rol entered is not valid')
        ),

    password: Joi.string().trim()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))
        .required()
        .error(
            new Error('Password must have 8 caracters min.')
        )

})

module.exports = {
    val_register
}