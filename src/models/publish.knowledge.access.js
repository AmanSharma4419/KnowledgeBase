const { Schema, model, Model } = require('mongoose');
const { ELA_UNABLE } = require("./../appConfig");

const { models } = require('./../constants/index');
const {
    secondsSinceEpoch
} = require("../helpers/utils.helper");


const schema = new Schema({
    userId: { type: String, default: '' },
    email: { type: String, default: '' },
    postId: { type: String, default: '' },
    isOwner: { type: Boolean, default: false },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
});

class PublishKnowledgeAccess extends Model {
    static async addAccessToViewPost(knowledgeBaseInfo) {
        return this.insertMany(knowledgeBaseInfo);
    }
}

schema.loadClass(PublishKnowledgeAccess);
module.exports = model(models.PUBLISH_KNOWLEDGE_ACCESS, schema, models.PUBLISH_KNOWLEDGE_ACCESS);
