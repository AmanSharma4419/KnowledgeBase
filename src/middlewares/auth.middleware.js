const mongoose = require('mongoose');
const debug = require('debug')('app:authMiddleware');

const { models, messages,enums } = require('./../constants/index');
// const { verifyToken } = require('../helpers/jwt.helper');
const {verifyToken} = require('./../helpers/utils.helper')
const UserAdmin = mongoose.model(models.USER_ADMIN);

// const User = mongoose.model(models.USER);

module.exports.auth = async (req, res, next) => {
  try {
    // Extract token from header
    const authHeader = req.get('authorization');
    let decoded;
    let userId;
    if (!authHeader) {
      return res.send({ statusCode: 401, message: 'Invalid Token' });
    }

    // Verify token
    try {
      decoded = await verifyToken(authHeader);
      // console.log(decoded)
      userId = decoded.user.userId;
    } catch (e) {
      return res.send({ statusCode: 401, message: messages.UNAUTHORIZED });
    }
    // console.log("body :: ",req.body)
    // if (userId != req.body.userId) {
    //   return res.send({statusCode: 401, message: messages.TOKEN_NOT_MATCH});
    // }

    // Find org
    let userProfile = await UserAdmin.getUserDataByUserId({ userId });
    // console.log("Auth ",userProfile)
    if (!userProfile) {
      return res.send({ statusCode: 401, message: 'User not found' });
    }
    req.userData = userProfile;
    return next();
  } catch (e) {
    debug(e);
    return res.send({ statusCode: 500, message: messages.INTERNAL_SERVER_ERROR });
  }
};
module.exports.authAgent = async (req, res, next) => {
  try {
    // Extract token from header
    const authHeader = req.get('authorization');
    let decoded;
    let userId;
    if (!authHeader) {
      return res.send({ statusCode: 401, message: 'Invalid Token' });
    }

    // Verify token
    try {
      decoded = await verifyToken(authHeader);
      // console.log(decoded)
      userId = decoded.user.userId;
    } catch (e) {
      return res.send({ statusCode: 401, message: messages.UNAUTHORIZED });
    }
    // console.log("body :: ",req.body)
    // if (userId != req.body.userId) {
    //   return res.send({statusCode: 401, message: messages.TOKEN_NOT_MATCH});
    // }

    // Find org
    let userProfile = await UserAdmin.getUserDataByUserId({ userId });
    // console.log("Auth ",userProfile)
    if (!userProfile) {
      return res.send({ statusCode: 401, message: 'User not found' });
    }
    req.userData = userProfile;
    return next();
  } catch (e) {
    debug(e);
    return res.send({ statusCode: 500, message: messages.INTERNAL_SERVER_ERROR });
  }
};
module.exports.userSts = async(req,res,next)=>{
  console.log(req.userData.userType ,"===", enums.USERTYPE.ORG)
  if(req.userData.userType === enums.USERTYPE.ORG){
    console.log(req.userData.userInfo);
      if(req.userData.userInfo.isEmailActive === true){
        next();
      } else {
        return res.send({
          statusCode: 400, message: messages.EMAIL_NOT_ACTIVATED
        });
      }
  } else {
    console.log(req.userData)
    if (req.userData.accountStatus === enums.USERSTATUS.BLOCK) {
      return res.send({statusCode: 400, message: messages.BLOCK_ACCOUNT_MSG});
    } else if (req.userData.accountStatus == enums.USERSTATUS.DEACTIVATE) {
      return res.send({
        statusCode: 400, data: {
          userId: req.userData.userId,
          accountStatus: req.userData.accountStatus
        }, message: messages.ACCOUNT_DEACTIVATED_MSG
      });
    } else if (req.userData.accountStatus == enums.USERSTATUS.ACTIVATE) {
      next();
    }
  }

  // if(req.userData.userType === enums.USERTYPE.MEU){
  //   next();
  // }



}
