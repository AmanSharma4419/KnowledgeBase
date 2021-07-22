var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const {mail_username, mail_password, mail_server , port} = require('./../appConfig');

module.exports = (html, to) =>{
    // console.log("html ",html)

    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport({
        host: mail_server,
        port: port,
        secure: false,
        auth: {
            user: mail_username,
            pass: mail_password
        }
    });

    var mail = {
        from:  mail_username,
        to: to,
        subject: "verification for verifyer",
        // text: "",
        html: html
    }

    smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + JSON.stringify(response.response));
        }
        smtpTransport.close();
    });
}
