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
        addValidProductSchema: joi.object().keys({
            name: joi.string().min(4).required(),
            description: joi.string().min(10).max(200).required(),
            category: joi.string().min(2).required(),
            price: joi.number().precision(2).min(0.00).required(),
            userId: joi.required()
        }),
        updateValidProductSchema: joi.object().keys({
            name: joi.string().min(4),
            description: joi.string().min(10).max(200),
            category: joi.string().min(2),
            price: joi.number().precision(2).min(0.00)
        }),
        addValidReviewSchema: joi.object().keys({
            description: joi.string().min(12).max(100).required(),
            rate: joi.number().min(0.5).max(5).required(),
            user_id: joi.required()
        })
    }
}