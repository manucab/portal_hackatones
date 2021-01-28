const Joi = require('joi');

const fieldsHackathons = Joi.object({

    // TODO -- check data format, change value in js front? timestamp sql?

    place: Joi.string().lowercase().trim()
        .valid('online', 'presencial', 'semipresencial')
        .required()
        .error(
            new Error('The valid values of place are: online, presencial, semipresencial')
        ),
    city: Joi.string().lowercase().trim()
        .alphanum()
        .min(3)
        .max(50)
        .error(
            new Error('The city entered is not valid')
        ),

    start_date: Joi.date()
        .required()
        .error(
            new Error('The start date entered is not valid')
        ),
    end_date: Joi.date()
        .required()
        .error(
            new Error('The end date entered is not valid')
        ),

    hackathon_status: Joi.string().lowercase().trim()
        .valid('pendiente', 'realizado', 'cancelado')
        .error(
            new Error('The status of hackathon is not valid, that has the following format: pendicente, realziado o cancelado')
        ),
    hackathon_info: Joi.string().trim()
        .min(3)
        .error(
            new Error('The info of hackathon is not valid')
        ),
    tech: Joi.array()
        .items(Joi.string(), Joi.number())
        .required()
        .max(50)
        .error(
            new Error('The tech of hackathon is not valid')
        ),
    thematic: Joi.string().lowercase().trim()
        .required()
        .min(2)
        .max(50)
        .error(
            new Error('The thematic of hackathon is not valid')
        ),

    links: Joi.array().items(Joi.object({
        link: Joi.string().hostname().lowercase().trim()
            .required()
            .error(
                new Error('The link of hackathon is not valid')
            ),
        webName: Joi.string().lowercase().trim()
            .required()
            .error(
                new Error('The webName of hackathon is not valid')
            ),
    })),
    // link: Joi.string().hostname().lowercase().trim()
    //     .required()
    //     .error(
    //         new Error('The link of hackathon is not valid')
    //     ),
    // webName: Joi.string().lowercase().trim()
    //     .required()
    //     .error(
    //         new Error('The webName of hackathon is not valid')
    //     ),

})

module.exports = {
    fieldsHackathons
}