const Joi = require('joi');

const fieldsHackathons = Joi.object({
    place: Joi.string().valid('online', 'presencial', 'semipresencial').required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    id_organizer: Joi.number().required(),
})

module.exports = {
    fieldsHackathons
}