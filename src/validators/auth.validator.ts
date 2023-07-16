import Joi from "joi";

export const authValidator = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z]\w{1,19}$/).messages({
        'string.pattern.base': 'Username consists of letters (big and small) and digits, length 1 min and 20 max characters'
    }).required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/).messages({
        'string.pattern.base': 'Password start of letter consist of letters, digits, characters and length 8 min and 20 max characters'
    }).required()
})