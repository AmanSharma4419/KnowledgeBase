const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const debug = require('debug')('app:emailHelper');
const { enums, models } = require('../constants/index');
const userRegistrationTemplate = require('../../emailTemplate/userRegistration');
const userLoginTemplate = require('../../emailTemplate/userLogin')
const userForgotPasswordTemplate = require('../../emailTemplate/forgot.password')

const { EMAIL_SENDER_NAME, SENDER_EMAIL, SENDER_API_KEY, SMTP_PASSWORD, SMTP_HOST, SMTP_SENDER, SMTP_PORT, SMTP_SENDER_NAME } = require('./../appConfig');
const mongoose = require("mongoose");
const ConfigModel = mongoose.model(models.CONFIG);

const SibApiV3Sdk = require('sib-api-v3-sdk');

exports.sendEmail = async function (to, subject, data, event, replyTo = '') {
  let template = '';
  if (event === enums.NOTIFICATION_EVENT.USER_REGISTERATION) {
    template = userRegistrationTemplate.template(data);
  } else if (event === enums.NOTIFICATION_EVENT.USER_LOGIN) {
    template = userLoginTemplate.template(data);
  } else if (event === enums.NOTIFICATION_EVENT.FORGOT_PASSWORD) {
    template = userForgotPasswordTemplate.template(data);
  }

  let MailerOption = await ConfigModel.getMailerOption()
  if (MailerOption.isZohoSendMail) {
    const transporter = nodeMailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      requireTLS: true,
      tls: { rejectUnauthorized: false },
      //secure: true, // use SSL
      auth: {
        user: SMTP_SENDER_NAME,
        pass: SMTP_PASSWORD
      }
    });

    const mail = {
      from: `${SMTP_SENDER_NAME} <${SMTP_SENDER}>`,
      to: to,
      subject: subject,
      html: template,
    };

    if (replyTo) {
      mail.replyTo = replyTo;
    }

    transporter.sendMail(mail, (error, response) => {
      if (error) {
        debug(error);
      } else {
        console.log("Mail Send ::", response)
        return response;
      }
    });
  } else {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = SENDER_API_KEY;
    new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      'subject': subject,
      'sender': { 'email': SENDER_EMAIL, 'name': EMAIL_SENDER_NAME },
      'to': [{ email: `${to}` }],
      'htmlContent': template
    }).then(function (data) {
      console.log(data);
    }, function (error) {
      console.error(error);
    });
  }
};



