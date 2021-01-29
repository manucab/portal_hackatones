const Joi = require('joi');

const val_statusInscription = Joi.object({

    inscription_status: Joi.string().lowercase().trim()
        .alphanum()
        .valid('inscrito','cancelado','asistente')
        .required()
        .error(
            new Error('The  inscription status entered is not valid')
        ),
      })

      module.exports = {
          val_statusInscription
      }
