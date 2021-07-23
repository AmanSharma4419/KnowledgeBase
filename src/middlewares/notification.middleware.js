const mongoose = require('mongoose');
const debug = require('debug')('app:notificationMiddleware');
const { messages, models, enums, messageContent } = require('../constants/index');
const common = require('../middlewares/common.middleware');
const { SUPPORT_EMAIL_ME, SUPPORT_EMAIL_ORG, PROMOTE_SEND_SMS_SENDER_OTP, SMPP_PE_ID } = require('./../appConfig');
const Notification = mongoose.model(models.NOTIFICATION);
const emailHelper = require('../helpers/email.helper');

module.exports.createNotification = async (userData, responseData, event, mediaType) => {
  let msgContent = ''
  switch (event) {
    case enums.NOTIFICATION_EVENT.USER_REGISTERATION:
      debug(`${enums.NOTIFICATION_EVENT.USER_REGISTERATION}`);
      if (mediaType.includes(enums.MEDIA_TYPE.MAIL)) {
        if (userData.email != '') {
          await emailHelper.sendEmail(userData.email, "Registeration Notification", userData, event, '');
        }
      }
      break;
    case enums.NOTIFICATION_EVENT.USER_LOGIN:
      debug(`${enums.NOTIFICATION_EVENT.USER_LOGIN}`);
      if (mediaType.includes(enums.MEDIA_TYPE.MAIL)) {
        let obj = {};
        if (userData.email != '') {
          await emailHelper.sendEmail(userData.email, "Login Notification", obj, event, '');
        }
      }
      break;
  }
}


