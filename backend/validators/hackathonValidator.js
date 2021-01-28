const Joi = require('joi');

const hackathonValidator = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .error(
            new Error('name should be a string between 3 and 100 characters')
        ),

    place: Joi.string()
        .valid('online', 'presencial','semipresencial')
        .error(
            new Error('place should be online or presencial or semipresencial')
        ),

    city: Joi.string()
        .min(3)
        .max(50)        
        .error(
            new Error('city should be a string between 3 and 100 characters')
        ),

    start_date: Joi.date()
        .error(
            new Error('Error data format')
        ),
        
    end_date: Joi.date()
        .error(
            new Error('Error date format')
        ),


    info: Joi.string()
        .min(3)
        .error(
            new Error('description should be a string with minimun 3 characters')
        ),
    techs: Joi.array()
        .min(1)
        .error(
            new Error('Techs must be an array')
        ),
    links: Joi.array()
        .min(1)
        .error(
            new Error('Links must be an array')
        ),
})

module.exports = {
    hackathonValidator
}