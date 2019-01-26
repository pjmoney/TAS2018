const joi = require('joi')

module.exports = {

    validateBody: (schema) => {
        return (req, res, next) => {
            const pass = joi.validate(req.body, schema)
            if (pass.error) {
                return res.status(400).json(pass.error)
            }

            if(!req.value) {req.value = {}}
            req.value['body'] = pass.value
            next()
        }
    },

    schemas: {
        authSchema: joi.object().keys({
            username: joi.string().min(4).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),
            country: joi.string().min(2).required()
        }),
        updateSchema: joi.object().keys({
            username: joi.string().min(4),
            email: joi.string().email(),
            password: joi.string().min(6),
            country: joi.string().min(2)
        }),
        loginSchema: joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required()
        })

    }
}