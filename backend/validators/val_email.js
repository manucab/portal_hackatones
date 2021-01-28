const Joi = require('joi');

const emailValidator = Joi.object({

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'es'] } })
        .required()
        .error(
            new Error('Email must have the following structure: name@xxxx.[com, es, net]')
        )
})

module.exports = {
    emailValidator
}