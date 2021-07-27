const { LOGO, SUPPORT_EMAIL } = require('../src/appConfig');
module.exports = {
  template: (sendMailData) => {
    otp = sendMailData.otp
    return `<!doctype html>
    <html>
     <head>
        <meta charset="utf-8">
        <title>Verifyer Emailer</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body style="margin:0">
        <div style="width:500px; margin:0 auto; padding:30px 30px 20px 30px;  background:#313131;">
            <div style="background:#000; padding:20px; border-radius:10px; color:#fff; text-align:justify;">
                <div style="margin-bottom:20px; text-align:center">
                    <img src=${LOGO}></div>
                <div
                    style="color:#fff; font-size:13px; font-family:Arial, Helvetica, sans-serif; line-height:20px; text-align:left">
                    <br>
                    Hi User <br> Your registeration is successfully done and your otp is ${otp} <br>
                    <br>
                    Thank you for registering with us<br>
                    <br>
                    Note: <span style="color:#999; font-size:11px">Please do not reply to this email.<br>
    
                        Team Blockcube
    
                        <div style="height:1px; background:#fff; margin:20px 0;"></div>
  
                </div>
            </div>
            <div
                style="font-size:11px; font-family:Arial, Helvetica, sans-serif; text-align:center; padding-top:20px; color:#fff;">
                Powered By Blockcube. © 2021 Blockcube Technologies Pvt. Ltd.
            </div>
        </div>
    </body>
    
    </html>`

  }
}

