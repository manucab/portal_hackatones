const Joi = require('joi');

const fieldsHackathons = Joi.object({

// Comprobar con objetos ..... *******

  place:  Joi.string()
      .validate(['online', 'presencial', 'semipresencial']),
})

module.exports = {
    fieldsHackathons
}
