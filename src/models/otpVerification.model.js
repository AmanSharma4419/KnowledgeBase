const { Schema, model, Model } = require('mongoose');
const { ELA_UNABLE } = require("./../appConfig");

const { models } = require('./../constants/index');
const {
    getHasedPassword, comparedHased, secondsSinceEpoch
} = require("../helpers/utils.helper");


const schema = new Schema({
    userId: { type: String, default: "", index: true },
    email: { type: String, default: "" },
    otp: { type: String, default: '' },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    isVerifyedStatus: { type: Boolean, default: false },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
});

class OtpVerification extends Model {
    static async saveUserOtp(otpInfo) {
        return this.create(otpInfo);
    }
    static async findUserStatusForOtpVerification(email) {
        return this.findOne({ $and: [{ email: email }, { isVerifyedStatus: true }] });
    }
    static async verifyOtp({ otp, userId }) {
        return this.findOne({ $and: [{ userId: userId }, { otp: otp }] });
    }
    static async updateOtpStatus(userId) {
        return this.findOneAndUpdate({ userId: userId }, { isVerifyedStatus: true }, { new: true });
    }
}

schema.loadClass(OtpVerification);
module.exports = model(models.OTP_VERIFICATION, schema, models.OTP_VERIFICATION);
