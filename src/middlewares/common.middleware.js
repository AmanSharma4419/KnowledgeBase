
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








module.exports = {
  generateOtp: generateOtp,
  dateSeconds: dateSeconds,

}
