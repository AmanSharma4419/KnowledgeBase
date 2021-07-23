const Joi = require('@hapi/joi');
const { messages, enums } = require('../constants/index');


module.exports.signUp = Joi.object({
  email: Joi.string().email().required().trim().error(new Error(messages.INVALID_EMAIL)),
  password: Joi.string().required().trim().description("Password").error(new Error(messages.PASSWORD_LENGTH_REQUIRED)),
  confirmPassword: Joi.string().required().trim().description("Password").error(new Error(messages.PASSWORD_LENGTH_REQUIRED)),
  category: Joi.string().required().trim().error(new Error(messages.INVALID_CATEGORY)),
});

module.exports.signIn = Joi.object({
  email: Joi.string().email().required().trim().error(new Error(messages.INVALID_EMAIL)),
  password: Joi.string().required().trim().description("Password").error(new Error(messages.PASSWORD_LENGTH_REQUIRED)),
});

module.exports.verifyOtp = Joi.object({
  userId: Joi.string().required().trim().description("userId").error(new Error(messages.USERID_REQUIRED)),
  otp: Joi.string().required().trim().description("otp").error(new Error(messages.OPT_REQUIRED)),
});
