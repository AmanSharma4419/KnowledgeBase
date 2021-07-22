const Joi = require('@hapi/joi');
const { messages, enums } = require('../constants/index');


module.exports.signUp = Joi.object({
  email: Joi.string().email().required().trim().error(new Error(messages.INVALID_EMAIL)),
  password: Joi.string().required().trim().description("Password").error(new Error(messages.PASSWORD_LENGTH_REQUIRED)),
  confirmPassword: Joi.string().required().trim().description("Password").error(new Error(messages.PASSWORD_LENGTH_REQUIRED)),
  category: Joi.string().required().trim().error(new Error(messages.INVALID_CATEGORY)),
});
