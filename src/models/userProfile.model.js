const { Schema, model, Model } = require('mongoose');
const { models } = require('./../constants/index');
const {
  secondsSinceEpoch
} = require("../helpers/utils.helper");

const schema = new Schema({
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  plainPassword: { type: String, default: '' },
  category: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  mobileNumber: { type: String, default: '' },
  employeeId: { type: String, default: '' },
  udt: { type: Date, default: new Date() },
  cdt: { type: Date, default: new Date() },
  uapdt: { type: Number, default: secondsSinceEpoch },
  capdt: { type: Number, default: secondsSinceEpoch },
  __v: { type: Number, select: false }
});

class UserDetailsRec extends Model {

  static async checkEmailAvaliabilty(email) {
    return this.find({ email: email });
  }
  static async updateUserProfile({ userProfileInfo, userId }) {
    return this.findByIdAndUpdate(userId, userProfileInfo, { new: true });
  }
  static async getUserDataByUserId(userId) {
    return this.findById(userId, { plainPassword: 0, });
  }
  static async createUser(userInfo) {
    return this.create(userInfo);
  }
  static async checkUserAvalibilty(email) {
    return this.findOne({ email: email });
  }
  static async userLogin({ email, password }) {
    return this.findOne({ $and: [{ email: email }, { password: password }] });
  }
  static async updatePassword({ userId, newPassword }) {
    return this.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
  }
}

schema.loadClass(UserDetailsRec);
module.exports = model(models.USER_PROFILE, schema, models.USER_PROFILE);
