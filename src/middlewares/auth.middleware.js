const mongoose = require('mongoose');
const debug = require('debug')('app:authMiddleware');

const { models, messages, enums } = require('./../constants/index');
// const { verifyToken } = require('../helpers/jwt.helper');
const { verifyToken } = require('./../helpers/utils.helper')
const UserProfile = mongoose.model(models.USER_PROFILE);

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
    let userProfile = await UserProfile.getUserDataByUserId(userId);
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
