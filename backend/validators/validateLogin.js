const Joi = require('joi');

const loginValidator = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .error(
            new Error('Email must have the following structure: name@xxxx.[com, es, net]')
        ),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,16}$'))
        .required()
        .error(
            new Error('Password must have 8 caracters min.')
        )

})

module.exports = {
    loginValidator
}