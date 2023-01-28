import Joi from 'joi';

const register = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    location: Joi.string().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
});

const updateUser = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    location: Joi.string().min(3).max(30),
    email: Joi.string().email().required(),
})

export default { register, login, updateUser };