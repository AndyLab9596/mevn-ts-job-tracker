import Joi from 'joi';

const createJob = Joi.object({
    position: Joi.string().max(20).required(),
    company: Joi.string().max(50).required(),
    status: Joi.string(),
    jobType: Joi.string(),
    jobLocation: Joi.string(),
});

export default { createJob }