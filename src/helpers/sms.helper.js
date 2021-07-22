const debug = require('debug')('app:smsHelper');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, SMPP_USERID, SMPP_PASSWORD, SMPP_SENDERID, SMPP_COUNTRYCODE, SMS,SMPP_PE_ID,
    PROMOTE_SEND_SMS_URL,
    PROMOTE_SEND_SMS_KEY,
    PROMOTE_SEND_SMS_COMPAIGN,
    PROMOTE_SEND_SMS_TYPE,
    PROMOTE_SEND_SMS_PEID,
    PROMOTE_SEND_SMS_SENDER_PROMO,
    PROMOTE_SEND_SMS_ROUTE_PROMO,
    PROMOTE_SEND_SMS_SENDER_OTP,
    PROMOTE_SEND_SMS_ROUTE_OTP,
    PROMOTE_SEND_SMS_SENDER_TRANS,
    PROMOTE_SEND_SMS_ROUTE_TRANS,
    PROMOTE_GET_HEADER_AND_TEMPLATE,
    PROMOTE_GET_HEADER,
    PROMOTE_GET_TEMPLATE,
    Token,
    PROMOTE_SEND_MISC_URL,
    TRANSACTION_SEND_SMS_URL,
    TRANSACTION_UESR ,
    TRANSACTION_PASSWORD ,
    TRANSACTION_SENDER ,
    TRANSACTION_PEID,
    TRANSACTION_CONTENTID,
} = require('./../appConfig');
// const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
let http = require('http');
const axios = require('axios');
const Request = require('request');

module.exports.sendSms = async ({ to, message }) => {
  try {
      console.log("peid : ",SMPP_PE_ID,"To",to)
      const url =
        'http://www.interconnectsoft.com/sendurl.aspx?user=' +
        SMPP_USERID +
        '&pwd=' +
        SMPP_PASSWORD +
        '&senderid=' +
        SMPP_SENDERID +
        '&CountryCode=' +
        SMPP_COUNTRYCODE +
        '&mobileno=' +
        to +
        '&msgtext=' +
        message +
        '&smstype=0/4/3&pe_id='+SMPP_PE_ID;
      console.log("url ::: ",url);
      await http.get(encodeURI(url));
  } catch (e) {
    debug(e);
  }
  return Promise.resolve();
};


module.exports.messageSender = async (numbers, message, entityId, senderId) => {
    try {
        let url = PROMOTE_SEND_SMS_URL+
            'key='+PROMOTE_SEND_SMS_KEY+
            '&campaign='+
            PROMOTE_SEND_SMS_COMPAIGN+
            '&routeid='+
            PROMOTE_SEND_SMS_ROUTE_PROMO+
            '&type='+
            PROMOTE_SEND_SMS_TYPE+
            '&contacts='+
            numbers+
            '&senderid='+
            senderId+
            '&msg='+
            message+
            '&peid='+
            entityId
        console.log(encodeURI(url))
        return await axios.get(encodeURI(url));
    } catch (e) {
        return e
    }
};

module.exports.getSmsShootIdDetails = async (smsShootId) => {
    try {
        let url = PROMOTE_SEND_MISC_URL+PROMOTE_SEND_SMS_KEY+'/getDLR/'+smsShootId
        return await axios.get(encodeURI(url));
    } catch (e) {
        return e
    }
};

module.exports.getHeaderAndTemplate = async (postData) => {
    try {
        return await axios({
            method: "post",
            url: PROMOTE_GET_HEADER_AND_TEMPLATE,
            headers: {
                'Content-Type': 'application/json'
            },
            data: postData,
        })
    } catch (e) {
        return e
    }
};

module.exports.getDLTHeader = async (postData) => {
    try {
        // let obRet =  await axios({
        //     method: "post",
        //     url: PROMOTE_GET_HEADER,
        //     rejectUnauthorized: false,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'access-token': Token
        //     },
        //     data: postData,
        // });
        // console.log(obRet);
        // return obRet;
        return new Promise((resolve, reject) => {
            var options = {
                rejectUnauthorized: false,
                method: 'POST',
                url: PROMOTE_GET_HEADER,
                headers: {
                    'access-token': Token,
                },
                json: true,
                body: postData
            };
            Request(options, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                resolve(body);
            });
        });

    } catch (e) {
        return e
    }
};

module.exports.getDLTTemplate = async (postData) => {
    try {
        // return await axios({
        //     method: "post",
        //     url: PROMOTE_GET_TEMPLATE,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'access-token': Token
        //     },
        //     data: postData,
        // })

        return new Promise((resolve, reject) => {
            var options = {
                rejectUnauthorized: false,
                method: 'POST',
                url: PROMOTE_GET_TEMPLATE,
                headers: {
                    'access-token': Token,
                },
                json: true,
                body: postData
            };
            Request(options, function (error, response, body) {
                console.log('error:', error);
                console.log('statusCode:', response && response.statusCode);
                console.log('body:', body);
                resolve(body);
            });
        });

    } catch (e) {
        return e
    }
};

module.exports.messageOTPSender = async (numbers, msg, entityId, senderId) => {
    try {
        let number = numbers.replace('+', '');
        let url = TRANSACTION_SEND_SMS_URL +'?user='+ TRANSACTION_UESR +
            '&pswd='+TRANSACTION_PASSWORD+'&sender='+TRANSACTION_SENDER+'&content='+msg+'&msisdn='+number+
            '&peid='+ TRANSACTION_PEID+'&content_id='+TRANSACTION_CONTENTID
        // let url = PROMOTE_SEND_SMS_URL+
        //     'key='+PROMOTE_SEND_SMS_KEY+
        //     '&campaign='+
        //     PROMOTE_SEND_SMS_COMPAIGN+
        //     '&routeid='+
        //     PROMOTE_SEND_SMS_ROUTE_OTP+
        //     '&type='+
        //     PROMOTE_SEND_SMS_TYPE+
        //     '&contacts='+
        //     numbers+
        //     '&senderid='+
        //     senderId+
        //     '&msg='+
        //     msg+
        //     '&peid='+
        //     entityId
        console.log(encodeURI(url))
        return await axios.get(encodeURI(url));
    } catch (e) {
        return e
    }
};


module.exports.getLatLangByAddress = async (address) => {
    try {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyAVgOfYTiPcwUR8G87zrTbqJpDg5fAaWhk';
        let resAdd =  await axios.get(encodeURI(url));
        console.log(resAdd);
        return resAdd;
    } catch (e) {
        return e
    }
};
