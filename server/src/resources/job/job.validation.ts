import Joi from 'joi';

const createJob = Joi.object({
    position: Joi.string().required(),
    company: Joi.string().required(),
    status: Joi.string(),
    jobType: Joi.string(),
    jobLocation: Joi.string(),
});

export default { createJob }