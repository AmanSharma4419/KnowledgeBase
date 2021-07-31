const { Schema, model, Model } = require('mongoose');
const { ELA_UNABLE } = require("./../appConfig");

const { models } = require('./../constants/index');

const {
    secondsSinceEpoch
} = require("../helpers/utils.helper");


const schema = new Schema({
    email: { type: String, default: '' },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
});

class EmailDetails extends Model {
    static async getAllEmailDetails() {
        return this.find({}, { email: 1, _id: 0 });
    }
}

schema.loadClass(EmailDetails);
module.exports = model(models.EMAILVERIFICATION, schema, models.EMAILVERIFICATION);
