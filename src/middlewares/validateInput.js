/** @format */
const Joi = require('joi');

const validateUser = Joi.object({
  firstname: Joi.string().min(4).max(15).required(),
  lastname: Joi.string().min(4).max(15).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .min(8)
    .max(10)
    .pattern(new RegExp('^[a-zA-Z0-9]{8,10}$'))
    .required(),
});

const validateAdmin = Joi.object({
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(10).max(13).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')) // number and Uppercase letter not working
    .required(),
});

module.exports = { validateUser, validateAdmin };
