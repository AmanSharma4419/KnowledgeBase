const debug = require('./debug')('app:missedNotificationJob');
const moment = require('./moment-timezone');
const mongoose = require('mongoose');

const { models } = require('../constants/index');
// const { sendNotification } = require('../helpers/notification.helper');
//
// const Notification = mongoose.model(models.NOTIFICATION);
// const Doctor = mongoose.model(models.DOCTOR);
//
// module.exports.missedNotification = async () => {
//   try {
//     debug('missedNotification start');
//     const yesterday = moment().subtract({ days: 1 });
//     const yesterdayStart = yesterday.set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
//     const yesterdayEnd = yesterday.set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });
//
//     const query = {
//       cts: { $gte: yesterdayStart, $lte: yesterdayEnd },
//       receiver: /^DT/gi,
//       isRead: false,
//     };
//
//     // Find appointments
//     const notifications = await Notification.aggregate([
//       { $match: query },
//       { $sort: { cts: -1 } },
//       { $group: { _id: '$receiver', notifications: { $push: '$$ROOT' } } },
//       { $match: { 'notifications.6': { $exists: true } } },
//     ]);
//
//     let counter = 0;
//
//     for (const notification of notifications) {
//       debug(`Processing ${++counter} of ${notifications.length} notifications: ${notification._id}`);
//
//       const doctor = await Doctor.findOne({ docId: notification._id });
//
//       let notificationText = '';
//       let srNo = 0;
//
//       for (const notif of notification.notifications.slice(0, 5)) {
//         notificationText += `${++srNo}. ${notif.message.message}\n`;
//       }
//
//       sendNotification({
//         emitter: 'SYSTEM',
//         receiver: notification._id,
//         eventName: '',
//         message: 'Your missed notifications',
//         title: 'Your missed notifications',
//         type: 'text',
//         method: ['EMAIL'],
//         template: 'MISSED_NOTIFICATION',
//         data: {
//           email: doctor.email,
//           TOTAL_UNREAD: notification.notifications.length,
//           LATEST_FIVE_NOTIFICATION: notificationText,
//         },
//       });
//     }
//
//     debug('missedNotification end');
//   } catch (e) {
//     debug(e);
//   }
// };
