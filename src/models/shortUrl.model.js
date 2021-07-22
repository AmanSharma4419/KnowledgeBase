const { Schema, model, Model } = require('mongoose');
const { models } = require('../constants/index');

let sortUrl = new Schema({
    count: { type: Number, default: 0 },
    shortUrl: { type: String },
    longUrl: { type: String },
    token: { type: String }
})

module.exports = model(models.SHORTURL, sortUrl, models.SHORTURL);