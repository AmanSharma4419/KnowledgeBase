const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const debug = require('debug')('app:emailHelper');
const { enums, models } = require('../constants/index');
const userRegistrationTemplate = require('../../emailTemplate/userRegistration');


const { EMAIL_SENDER_NAME, SENDER_EMAIL, SENDER_API_KEY, SMTP_PASSWORD, SMTP_HOST, SMTP_SENDER, SMTP_PORT, SMTP_SENDER_NAME } = require('./../appConfig');
const mongoose = require("mongoose");
const ConfigModel = mongoose.model(models.CONFIG);

const SibApiV3Sdk = require('sib-api-v3-sdk');

exports.sendEmail = async function (to, subject, data, event, replyTo = '') {
  console.log(to, subject, event, "kkkkk")
  let template = '';
  if (event === enums.NOTIFICATION_EVENT.USER_REGISTERATION) {
    template = userRegistrationTemplate.template(data);
  }
  // else if(event === enums.NOTIFICATION_EVENT.CHANGE_PASSWORD) {
  //   template = changePasswordTemplate.template(data);
  // }
  let MailerOption = await ConfigModel.getMailerOption()
  console.log(MailerOption, "i the mmmy")
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


/*
const transporter = nodeMailer.createTransport(
  smtpTransport({
    service: MAIL_SERVER,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    }
  }),
);

exports.sendEmail = function (to, subject,data,fields,replyTo = '') {
  var template;
  if(fields =="EmailVerify"){
    template = updateInfoTemplateSignup.template(data);
    console.log(template);

  }else if(fields == "documentShare"){
    template = receivedDocumentTemplate.template(data);
  }else if(fields =='AcceptRreject'){
    template = acceptAndRejectTemplate.template(data);
  }else if(fields == 'ForgetPassword'){
    template = acceptAndRejectTemplate.template2(data);
  }
  const mail = {
    from: `${SMTP_SENDER_NAME} <${MAIL_USER}>`,
    to:to,
    subject : subject,
    html: template,
  };

  if (replyTo) {
    mail.replyTo = replyTo;
  }

  transporter.sendMail(mail, (error, response) => {
    if (error) {
      debug(error);
    } else {
      console.log("Mail Send ::",response )
      return response;
    }
  });
};*/
