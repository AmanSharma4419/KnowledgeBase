const { Schema, model, Model } = require('mongoose');
const { ELA_UNABLE } = require("./../appConfig");

const { models } = require('./../constants/index');
const {
    secondsSinceEpoch
} = require("../helpers/utils.helper");


const schema = new Schema({
    category: { type: String, enum: ['Tech', 'Business', 'Sales'], default: '' },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
});

class CategoryDetails extends Model {
    static async getAllCategories() {
        return this.find();
    }
}

schema.loadClass(CategoryDetails);
module.exports = model(models.CATEGORY, schema, models.CATEGORY);
