const path = require("path");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const debug = require("debug")("app:userController");
const { messages, models, enums } = require("../constants/index");
const SmsHelper = require("../helpers/sms.helper");
const common = require("./../middlewares/common.middleware");
const Notification = require('../middlewares/notification.middleware');
const NotificationData = mongoose.model(models.NOTIFICATION);
const { generateOtp } = require("../middlewares/common.middleware");
const {
  generateRandomString,
  generateToken,
  generateUniqueId,
  secondsSinceEpoch,
  getHasedPassword,
  comparedHased,
  generateReferralEight,
  checkFileExt,
  createDirectory
} = require("./../helpers/utils.helper");
const emailHelper = require("../helpers/email.helper");

const UserProfile = mongoose.model(models.USER_PROFILE);
const Category = mongoose.model(models.CATEGORY);
const OtpVerification = mongoose.model(models.OTP_VERIFICATION)

const saltRounds = 10;
let apocTime = Math.round(new Date() / 1000);

module.exports.signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, category } = req.validatedParams
    const isUserExisted = await UserProfile.checkEmailAvaliabilty(email)
    if (isUserExisted.length > 0) {
      return res.send({
        statusCode: 400,
        message: messages.EMAIL_NOT_AVAILABLE,
      });
    }
    if (confirmPassword !== password) {
      return res.send({
        statusCode: "400",
        message: messages.PASSWORD_DOES_NOT_MATCH,
      });
    }

    const userInfo = { email: email, password: getHasedPassword(password, saltRounds), plainPassword: password, category: category }
    const result = await UserProfile.createUser(userInfo)
    var data = { ...result._doc }
    if (result) {
      const otp = generateOtp()
      data.otp = otp
      delete data.plainPassword
      const { email, _id } = result
      const otpInfo = { email: email, userId: _id, otp: otp }
      await OtpVerification.saveUserOtp(otpInfo)
    }
    let mediaType = ['MAIL'];
    await Notification.createNotification(result, "", enums.NOTIFICATION_EVENT.USER_REGISTERATION, mediaType);
    return res.send({
      statusCode: 200,
      message: messages.SIGNUP_SUCESS,
      data: data,
    });
  } catch (error) {
    return res.send({
      statusCode: 400,
      message: error.message,
    });
  }
};

module.exports.listCategory = async (req, res) => {
  try {
    const result = await Category.getAllCategories()
    return res.send({
      statusCode: 200,
      message: messages.CATEGORY_LISTED_SUCESSFULLY,
      data: result,
    });
  } catch (error) {
    return res.send({
      statusCode: 400,
      message: error.message,
    });
  }
}