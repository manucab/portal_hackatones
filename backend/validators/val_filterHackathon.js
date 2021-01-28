const Joi = require('joi');

const filterHackathons = Joi.object({

    // TODO -- check data format, change value in js front? timestamp sql?

    hackathon_place: Joi.string().lowercase().trim()
        .valid('online', 'presencial', 'semipresencial')
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
        .error(
            new Error('The start date entered is not valid')
        ),
    end_date: Joi.date()
        .error(
            new Error('The end date entered is not valid')
        ),
    tech: Joi.array()
        .items(Joi.string(), Joi.number())
        .max(50)
        .error(
            new Error('The tech of hackathon is not valid')
        ),
    thematic: Joi.string().lowercase().trim()
        .min(2)
        .max(50)
        .error(
            new Error('The thematic of hackathon is not valid')
        ),
})

module.exports = {
    filterHackathons
}