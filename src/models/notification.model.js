const { Schema, model, Model } = require('mongoose');

const { models } = require('./../constants/index');
const { generateUniqueId, secondsSinceEpoch } = require('../helpers/utils.helper');

const schema = new Schema({
    notifId: { type: String, default: () => generateUniqueId({ prefix: 'NF' }), index: true },
    receiver: { type: String, default: ''},
    sender: { type: String, default: ''},
    message: { type: String, default: ''},
    isRead: { type: Boolean, default: false},
    mediaUrl: { type: String, default: ''},
    mediaType:{ type: Array, default:[] },
    eventName: { type: String, default: '' },
    userType: { type: String, default: 'AGENCY' },
    udt: { type: Date, default: new Date() },
    cdt: { type: Date, default: new Date() },
    uapdt: { type: Number, default: secondsSinceEpoch },
    capdt: { type: Number, default: secondsSinceEpoch },
    __v: { type: Number, select: false }
});

class NotificationDetails {
    static async getAllNewNotifications(email,mobileNumber, page, limit) {
        return this.find({ receiver: email, userType:'AGENCY' }).sort({_id:-1}).skip((page-1)*limit).limit(limit)
    }
    static async getAllNewNotificationsByMobile( mobileNumber, page, limit ) {
        return this.find({ receiver: mobileNumber,  isRead:false, userType:'AGENCY' }).sort({_id:-1}).skip((page-1)*limit).limit(limit)
    }
    static async addNotification(notifyData){
        return this.create(notifyData)
    }
    static async countDocument({email}){
        return this.countDocuments({'receiver': email, isRead:false});
    }

    static async countDocumentINAGENT({mobileNumber}){
        return this.countDocuments({'receiver': mobileNumber, isRead:false, userType:'AGENCY'});
    }
}
schema.loadClass(NotificationDetails);
module.exports = model(models.NOTIFICATION, schema, models.NOTIFICATION);