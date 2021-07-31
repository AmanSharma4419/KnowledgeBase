const { Schema, model, Model } = require('mongoose');
const { models } = require('./../constants/index');
const { generateUniqueId, secondsSinceEpoch } = require('../helpers/utils.helper');
const { default: enums } = require('../constants/enums');

const schema = new Schema({
    isZohoSendMail: { type: Boolean, default: true },
    __v: { type: Number, select: false }
});

class ConfigModel extends Model {
    static async getMailerOption(){
        return this.findOne({}, {_id:0, isZohoSendMail:1}).lean()
    };
}

schema.loadClass(ConfigModel);
module.exports = model(models.CONFIG, schema, models.CONFIG);