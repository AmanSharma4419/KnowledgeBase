const path = require('path')
const fs = require('fs')
var crypto = require('crypto');
var http = require('http');
var url = require('url');

// const twilioConfig = require('../config/twilio.config.js');
// const {SMPP_USERID,SMPP_PASSWORD,SMPP_SENDERID,SMPP_COUNTRYCODE,SMS}  = require('../config/configuration.js');

// const client = require('twilio')(
//     twilioConfig.accountSID,
//     twilioConfig.authToken
// );

/************************************ Validate Mobile Number ****************************** */
// function verify(data){
//   var mobile = data.mobileCode+ data.mobileNumber
//   console.log(mobile)
//   client.lookups.phoneNumbers(mobile)
//       .fetch({type: ['carrier']})
//       .then(phone_number => console.log(phone_number.carrier));
//
// }

/***************************************** GENERATE USER ID ***************************** */
function generateUserId() {
  var rand = Math.floor(1000 + Math.random() * 7000);
  var userId = Date.now() + '' + rand
  return userId
}

/********************************************* GENERATE REFER CODE ************************* */
function generateReferCode(userId) {
  var rand = require("crypto").randomBytes(2).toString('hex')
  var code = "VR" + userId.substring(1, 2) + rand;
  console.log(code, "code");
  return code;
}


function getShareId() {
  var rand = Math.floor(1000 + Math.random() * 7000);
  var shareId = Math.floor(Date.now() / 1000) + '' + rand;
  console.log("shareId ", shareId)
  return shareId;
}

/******************************************* COnvert date Second *************************** */
function dateSeconds(date) {
  if (date) return Math.floor(date / 1000).toString()
  else return Math.floor(Date.now() / 1000).toString()
}

/***************************************** GENERATE OTP ********************************* */
function generateOtp() {
  let otp = Math.floor(1000 + Math.random() * 7000)
  return otp
}

/************************************* response Object ************************************** */
function responseJson(res, status, message) {
  return res.json({
    status: status,
    message: message
  });
}

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}





module.exports = {
  generateUserId: generateUserId,
  generateReferCode: generateReferCode,
  getShareId: getShareId,
  generateOtp: generateOtp,
  dateSeconds: dateSeconds,
  // sendSMS: sendSMS,
  responseJson: responseJson,
  // verify:verify,
  replaceAll: replaceAll,
}
