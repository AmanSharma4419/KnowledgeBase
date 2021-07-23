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
    static async totalCountForDraft() {
        return this.find({ isPublished: false }).count()
    }
    static async getAllDraftList({ userId, pageNo, limit }) {
        return this.aggregate([{ $match: { userId: userId.toString(), isPublished: false } }, { $sort: ({ capdt: -1 }) },
        { $skip: (pageNo - 1) * limit },
        { $limit: limit }])
    }
    static async getAllTopicsByCategory(category) {
        return this.find({ $and: [{ category: category }, { isPublished: true }] });
    }
    static async getAllViewListByTopic({ topic, pageNo, limit }) {
        return this.aggregate([{ $match: { topic: topic, isPublished: true } }, { $sort: ({ capdt: -1 }) },
        { $skip: (pageNo - 1) * limit },
        { $limit: limit }])
    }
    static async totalCountForView() {
        return this.find({ isPublished: true }).count()
    }
}

schema.loadClass(KnowledgeBaseDetails);
module.exports = model(models.KNOWLEDGE_BASE, schema, models.KNOWLEDGE_BASE);
