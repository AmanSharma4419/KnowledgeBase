const { Schema, model, Model } = require('mongoose');
const { ELA_UNABLE } = require("./../appConfig");

const { models } = require('./../constants/index');
const {
    secondsSinceEpoch
} = require("../helpers/utils.helper");


const schema = new Schema({
    token: { type: String, default: '' },
    userId: { type: String, default: '' },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
});

class ForgotPasswordToken extends Model {
    static async addToken(tokenInfo) {
        return this.create(tokenInfo);
    }
    static async getTokenVerification({ userId, token }) {
        return this.findOne({ $and: [{ userId: userId }, { token: token }] });
    }
    static async findTokenAndRemove(id) {
        console.log(id, "lo")
        return this.findByIdAndRemove(id);
    }
}

schema.loadClass(ForgotPasswordToken);
module.exports = model(models.FORGOT_PASSWORD_TOKEN, schema, models.FORGOT_PASSWORD_TOKEN);
