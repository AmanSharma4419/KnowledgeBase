const { Schema, model, Model } = require('mongoose');
const { ELA_UNABLE } = require("./../appConfig");

const { models } = require('./../constants/index');
const {
    secondsSinceEpoch
} = require("../helpers/utils.helper");


const schema = new Schema({
    userId: { type: String, default: "", index: true },
    category: { type: String, default: '' },
    topic: { type: String, default: '' },
    knowledgeBase: { type: String, default: '' },
    isPublished: { type: Boolean, default: false },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
});

class KnowledgeBaseDetails extends Model {
    static async createKnowledgeBase(KnowledgeBaseInfo) {
        return this.create(KnowledgeBaseInfo);
    }
}

schema.loadClass(KnowledgeBaseDetails);
module.exports = model(models.KNOWLEDGE_BASE, schema, models.KNOWLEDGE_BASE);
