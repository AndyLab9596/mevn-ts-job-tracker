import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    location: Joi.string().min(3).max(30).default('TP.HCM'),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

export default { register, login };