const mongoose = require("mongoose");
const { messages, models, enums } = require("../constants/index");
const Notification = require('../middlewares/notification.middleware');
const { generateOtp } = require("../middlewares/common.middleware");
const {
  generateToken,
  getHasedPassword,
  comparedHased,
  generateRandomString
} = require("./../helpers/utils.helper");
const { APP_URL_FRONT } = require("./../appConfig")
// Models of the schemas
const UserProfile = mongoose.model(models.USER_PROFILE);
const Category = mongoose.model(models.CATEGORY);
const OtpVerification = mongoose.model(models.OTP_VERIFICATION)
const KnowledgeBase = mongoose.model(models.KNOWLEDGE_BASE)
const EmailVerification = mongoose.model(models.EMAILVERIFICATION)
const ForgotPasswordToken = mongoose.model(models.FORGOT_PASSWORD_TOKEN)
const saltRounds = 10;

// Controller for registering the user in knowledgeBase takes email, password, confirmPassword, category as req params and returns the registered user details also send the email for user registeration
module.exports.signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, category } = req.validatedParams
    const emails = await EmailVerification.getAllEmailDetails()
    var requriedEmail = []
    emails.map(v => {
      return requriedEmail.push(v.email)
    })
    if (new RegExp(requriedEmail.join("|")).test(email)) {
      const isUserExisted = await UserProfile.checkEmailAvaliabilty(email)
      if (isUserExisted.length > 0) {
        return res.send({
          statusCode: 400,
          message: messages.EMAIL_NOT_AVAILABLE,
        });
      }
      if (confirmPassword !== password) {
        return res.send({
          statusCode: 400,
          message: messages.PASSWORD_DOES_NOT_MATCH,
        });
      }
      const userInfo = { email: email, password: getHasedPassword(password, saltRounds), plainPassword: password, category: category }
      const result = await UserProfile.createUser(userInfo)
      var data = { ...result._doc }
      if (result) {
        const otp = generateOtp()
        const { email, _id } = result
        const otpInfo = { email: email, userId: _id, otp: otp }
        await OtpVerification.saveUserOtp(otpInfo)
        data.otp = otp
        delete data.plainPassword
      }
      let mediaType = ['MAIL'];
      await Notification.createNotification(data, "", enums.NOTIFICATION_EVENT.USER_REGISTERATION, mediaType);
      return res.send({
        statusCode: 200,
        message: messages.SIGNUP_SUCESS,
        data: data,
      });
    } else {
      return res.send({
        statusCode: 400,
        message: messages.EMAIL_NOT_MATCHED,
        data: data,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
};

// Controller for listing all the avaliabe category for knowledgebase
module.exports.listCategory = async (req, res) => {
  try {
    const result = await Category.getAllCategories()
    if (result.length) {
      return res.send({
        statusCode: 200,
        message: messages.CATEGORY_LISTED_SUCESSFULLY,
        data: result,
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.NO_RECORD_FOUND })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for verification of user otp recived while signup takes otp, userId in the req params and sends the opt verification status as response
module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp, userId } = req.validatedParams
    const result = await OtpVerification.verifyOtp({ otp: otp, userId: userId })
    if (result) {
      const userProfileInfo = { isOtpVerifyedStatus: true }
      await OtpVerification.updateOtpStatus(result.userId)
      await UserProfile.updateUserProfile({ userProfileInfo, userId })
      return res.send({
        statusCode: 200,
        message: messages.OTP_VERIFICATION_DONE,
      });
    } else {
      return res.send({
        statusCode: 400,
        message: messages.OTP_VERIFICATION_FAIL,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for signing in a particular user in the knowledgebase with email ,password it returns a JWT token as a response with user info also send the email for user login
module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.validatedParams
    const userOtpVerificationStatus = await OtpVerification.findUserStatusForOtpVerification(email)
    if (userOtpVerificationStatus && userOtpVerificationStatus.isVerifyedStatus) {
      const result = await UserProfile.checkUserAvalibilty(email)
      if (!result) {
        return res.send({ statusCode: 400, message: messages.USER_NOT_FOUND });
      }
      var user = { ...result._doc }
      const isValide = await comparedHased(password, result.password);
      if (isValide) {
        const token = await generateToken({
          user: {
            userId: result._id,
          },
        });
        delete user.password
        delete user.plainPassword
        user.token = token
        let mediaType = ['MAIL'];
        await Notification.createNotification(result, "", enums.NOTIFICATION_EVENT.USER_LOGIN, mediaType);
        return res.send({
          statusCode: 200,
          message: messages.LOGIN_SUCCESS,
          data: user,
        });
      } else {
        return res.send({
          statusCode: 400,
          message: messages.PASSWORD_NOT_MATCHED
        });
      }
    } else {
      return res.send({
        statusCode: 400,
        message: messages.OTP_NOT_VERIFYED
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for creating the entery of a knowledge base and save it as published or draft item in db.it takes  category, topic, knowledgeBase, isPublished in params and returns created Knowledge base as response.
module.exports.createKnowledgeBase = async (req, res) => {
  try {
    const { _id, email } = req.userData;
    const { category, topic, knowledgeBase, isPublished } = req.validatedParams
    const knowledgeBaseInfo = { userId: _id, userEmail: email, category: category, topic: topic, knowledgeBase: knowledgeBase, isPublished: isPublished }
    const result = await KnowledgeBase.createKnowledgeBase(knowledgeBaseInfo)
    return res.send({
      statusCode: 200,
      message: messages.KNOWLEGE_BASE_CREATED,
      data: result,
    });
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for listing the single knowledgebase entery according to the id it takes knowledgebaseId as params
module.exports.getKnowledgeBaseById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await KnowledgeBase.getKnowledgeById(id)
    if (result) {
      return res.send({
        statusCode: 200,
        message: messages.DRAFT_FETCHED_SUCESSFULLY,
        data: result,
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.NO_RECORD_FOUND })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}
// Controller for updating the single knowledge base entery according to the id
module.exports.updateKnowledgeBase = async (req, res) => {
  try {
    const { _id, email } = req.userData;
    const id = req.params.id;
    const { category, topic, knowledgeBase, isPublished } = req.validatedParams
    const knowledgeBaseInfo = { userId: _id, userEmail: email, category: category, topic: topic, knowledgeBase: knowledgeBase, isPublished: isPublished }
    const result = await KnowledgeBase.updateKnowledgeBase({ knowledgeBaseInfo, id })
    return res.send({
      statusCode: 200,
      message: messages.KNOWLEGE_BASE_UPDATED,
      data: result,
    });
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for listing all the items with pagination and totalcount in knowledgebase saved as draft.
module.exports.getAllDraftList = async (req, res) => {
  try {
    const userId = req.userData._id;
    const { pageNo, limit } = req.validatedParams
    const result = await KnowledgeBase.getAllDraftList({ userId, pageNo, limit })
    const totalCount = await KnowledgeBase.totalCountForDraft(userId)
    if (result.length) {
      return res.send({
        statusCode: 200,
        message: messages.DRAFT_LISTED_SUCESSFULLY,
        data: { result, totalCount },
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.NO_RECORD_FOUND })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for listing all the topics in the knowledgebase according to the category takes category as req parameter.
module.exports.getAllTopicListByCategory = async (req, res) => {
  try {
    const { category } = req.validatedParams
    const result = await KnowledgeBase.getAllTopicsByCategory(category)
    if (result.length > 0) {
      var arr = []
      result.map((val, index) => {
        return arr.push(val.topic)
      })
      const topicList = [...new Set(arr)]
      return res.send({
        statusCode: 200,
        message: messages.TOPIC_LISTED_SUCESSFULLY,
        data: topicList,
      });
    } else {
      return res.send({
        statusCode: 400,
        message: messages.NO_RECORD_FOUND,
        data: result,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for listing all the items with pagination and totalCount in knowledge base saved as published according to the topic and category  with its total count
module.exports.getAllViewListByTopic = async (req, res) => {
  try {
    const { pageNo, limit, topic, category } = req.validatedParams
    const result = await KnowledgeBase.getAllViewListByTopic({ topic, pageNo, limit, category })
    const totalCount = await KnowledgeBase.totalCountForView({ topic, category })
    if (result.length) {
      return res.send({
        statusCode: 200,
        message: messages.VIEW_LISTED_SUCESSFULLY,
        data: { result, totalCount },
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.NO_RECORD_FOUND })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for getting the user profile through userId by jwt token
module.exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userData._id;
    const userInfo = await UserProfile.getUserDataByUserId(userId)
    if (userInfo) {
      return res.send({
        statusCode: 200,
        message: messages.USER_FOUND,
        data: userInfo,
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.NO_RECORD_FOUND })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}
// Controller for find by id userProfile and update it 
module.exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.userData._id;
    const { employeeId, firstName, lastName, mobileNumber } = req.validatedParams
    const userProfileInfo = { employeeId: employeeId, firstName: firstName, lastName: lastName, mobileNumber: mobileNumber }
    const result = await UserProfile.updateUserProfile({ userProfileInfo, userId })
    if (result) {
      var userProfile = { ...result._doc }
      delete userProfile.password
      delete userProfile.plainPassword
      return res.send({
        statusCode: 200,
        message: messages.USER_PROFILE_UPDATED,
        data: userProfile,
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.USER_PROFILE_UPDATE_FAILS })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}
// Controller for viewing the user profile by user id getting from params to find out the auther of  the knowldgebase enteries
module.exports.viewUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const userInfo = await UserProfile.getUserDataByUserId(userId)
    if (userInfo) {
      return res.send({
        statusCode: 200,
        message: messages.USER_FOUND,
        data: userInfo,
      });
    }
    else {
      return res.json({ statusCode: 400, message: messages.NO_RECORD_FOUND })
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
}

// Controller for change the user password after login
module.exports.changePassword = async (req, res) => {
  try {
    const userId = req.userData._id;
    const { oldPassword, newPassword } = req.validatedParams;
    if (oldPassword === newPassword) {
      return res.send({
        statusCode: "400",
        message: messages.INVALID_PASSWORD,
      });
    }
    const userProfile = await UserProfile.getUserDataByUserId(userId)
    if (userProfile) {
      const isValide = await comparedHased(oldPassword, userProfile.password);
      if (isValide) {
        const updatedResult = await UserProfile.updatePassword({ userId: userId, newPassword: getHasedPassword(newPassword, saltRounds) })
        if (updatedResult) {
          return res.send({
            statusCode: 200,
            message: messages.USER_PASSWORD_CHANGED,
            data: updatedResult,
          });
        }
        else {
          return res.json({ statusCode: 400, message: messages.USER_PASSWORD_CHANGING_FAILS })
        }
      } else {
        return res.send({
          statusCode: 400,
          message: messages.PASSWORD_NOT_MATCHED
        });
      }
    } else {
      return res.send({
        statusCode: 400,
        message: messages.NO_RECORD_FOUND,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
};
// Controller for forgot user password
module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.validatedParams;
    const userProfile = await UserProfile.checkUserAvalibilty(email);
    if (!userProfile) {
      return res.send({
        statusCode: 400,
        message: messages.USER_NOT_FOUND,
      });
    }
    const token = generateRandomString({ length: 128 });
    const generatedToken = await ForgotPasswordToken.addToken({ token: token, userId: userProfile._id })
    if (generatedToken) {
      const link = `${APP_URL_FRONT}/forgotPasswordVerify?token=${token}&userId=${userProfile._id}`;
      let shortUrl = link;
      var obj = {};
      obj.link = shortUrl;
      obj.email = email;
      let mediaType = ['MAIL'];
      await Notification.createNotification(obj, "", enums.NOTIFICATION_EVENT.FORGOT_PASSWORD, mediaType);
      return res.send({
        statusCode: 200,
        message: messages.FORGET_PASSWORD_EMAIL_SENT,
      });
    } else {
      return res.send({
        statusCode: 400,
        message: messages.FORGET_PASSWORD_EMAIL_SENT_FAILS,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
};

// Controller to verify forgot password
module.exports.forgetPasswordVerify = async (req, res) => {
  try {
    const { token, userId, password } = req.validatedParams;
    const userProfile = await UserProfile.getUserDataByUserId(userId);
    if (!userProfile) {
      return res.send({
        statusCode: 400,
        message: messages.INVALID_USERID,
      });
    }
    const result = await ForgotPasswordToken.getTokenVerification({ userId: userId, token: token })
    if (result) {
      await UserProfile.updatePassword({ userId: userId, newPassword: getHasedPassword(password, saltRounds) })
      await ForgotPasswordToken.findTokenAndRemove(result._id)
      return res.send({
        statusCode: 200,
        message: messages.USER_PASSWORD_CHANGED,
      });
    } else {
      return res.send({
        statusCode: 400,
        message: messages.INVALID_TOKEN,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
};

// Controller to list the registered user profiles 
module.exports.listUserProfile = async (req, res) => {
  try {
    const result = await UserProfile.getAllVerifyedRegisteredUsers()
    if (result.length > 0) {
      return res.send({
        statusCode: 200,
        message: messages.USER_PROFILE_FETCHED_SUCESSFULLY,
        data: result
      });
    } else {
      return res.send({
        statusCode: 400,
        message: messages.NO_RECORD_FOUND,
      });
    }
  } catch (error) {
    return res.send({
      statusCode: 500,
      message: error.message,
    });
  }
};