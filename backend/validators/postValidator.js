const Joi = require('joi');

const postValidator = Joi.object({
    title: Joi.string()
        .min(3)
        .max(300)
        .error(
            new Error('title should be a string between 3 and 300 characters')
        ),

    content: Joi.string()
        .min(3)     
        .error(
            new Error('content should be a string with min 3 characters')
        ),

    publication_date: Joi.date()
        .error(
            new Error('Error date format')
        ),
        
    hidden: Joi.date()
    .valid('true','false')
    .error(
        new Error('Error wrong value')
    ),

})

module.exports = postValidator
