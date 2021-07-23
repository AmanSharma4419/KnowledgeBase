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

module.exports.createKnowledgeBase = Joi.object({
  topic: Joi.string().required().trim().description("topic").error(new Error(messages.INVALID_TOPIC)),
  category: Joi.string().required().trim().error(new Error(messages.INVALID_CATEGORY)),
  knowledgeBase: Joi.string().required().trim().description("knowledgeBase").error(new Error(messages.INVALID_KNOWLEDGEBASE)),
  isPublished: Joi.boolean().optional().description("isPublished").error(new Error(messages.INVALID_ISPUBLISHED)),
});

module.exports.updateKnowledgeBase = Joi.object({
  id: Joi.string().allow().trim().description("id").error(new Error(messages.USERID_REQUIRED)),
  topic: Joi.string().required().trim().description("topic").error(new Error(messages.INVALID_TOPIC)),
  category: Joi.string().required().trim().error(new Error(messages.INVALID_CATEGORY)),
  knowledgeBase: Joi.string().required().trim().description("knowledgeBase").error(new Error(messages.INVALID_KNOWLEDGEBASE)),
  isPublished: Joi.boolean().optional().description("isPublished").error(new Error(messages.INVALID_ISPUBLISHED)),
});

module.exports.getAllDraftList = Joi.object({
  pageNo: Joi.number().required().error(new Error(messages.INVALID_PAGE)),
  limit: Joi.number().required().error(new Error(messages.INVALID_LIMIT)),
});

module.exports.getAllTopicListByCategory = Joi.object({
  category: Joi.string().required().trim().error(new Error(messages.INVALID_CATEGORY)),
});

module.exports.getAllViewListByTopic = Joi.object({
  topic: Joi.string().required().trim().description("topic").error(new Error(messages.INVALID_TOPIC)),
  pageNo: Joi.number().required().error(new Error(messages.INVALID_PAGE)),
  limit: Joi.number().required().error(new Error(messages.INVALID_LIMIT)),
});