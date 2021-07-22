const { LOGO,SUPPORT_EMAIL,REDIRECT_LINK } = require('../src/appConfig');
module.exports={
    template:(sendMailData,DISCLAIMER)=>{
        amount = sendMailData.amount
        email = sendMailData.email
        return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Verifyer Emailer</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head><body style="margin:0">
<div style="width:500px; margin:0 auto; padding:30px 30px 20px 30px;  background:#313131;">
<div style="background:#000; padding:20px; border-radius:10px; color:#fff; text-align:justify;">
<div style="margin-bottom:20px; text-align:center">
<img src=${LOGO} ></div>
<div style="color:#fff; font-size:13px; font-family:Arial, Helvetica, sans-serif; line-height:20px; text-align:left">
Hi User,<br>
<br>
Welcome to Verifyer!!
<br>
<br>
Thank you for connecting with us.
Your have successfully Logged In.

<br>
<br>
Note: Please do not reply to this email. It is an auto generated email. For any query or clarification, please email at,
<span style="text-decoration:underline">${email}</span><br>
<br>
With Regards,<br>

Team Verifyer
<div style="height:1px; background:#fff; margin:20px 0;"></div>
<p style="margin-top: -15px;text-align: justify;letter-spacing: 0.03px;">${DISCLAIMER}</p>
</div>

</div>

<div style="font-size:11px; font-family:Arial, Helvetica, sans-serif; text-align:center; padding-top:20px; color:#fff;">
Powered By Verifyer. © 2020 Verifyer Technologies Pvt. Ltd.
</div>
</div>
</body>
</html>`

    }
}

