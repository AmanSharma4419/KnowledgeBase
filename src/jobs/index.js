const CronJob = require('./cron').CronJob;
const debug = require('./debug')('app:job');

// module.exports.init = () => {
//   new CronJob('0 0 * * *', syncGraphData, null, true, null, null, true);
//   new CronJob('0 */1 * * *', updateExpiredPlans, null, true, null, null, true);
//   new CronJob('0 */1 * * *', autoCancellation, null, true, null, null, true);
//   new CronJob('*/5 * * * *', appointmentReminder, null, true, null, null, true);
//   new CronJob('0 7 * * *', missedNotification, null, true, null, null, true);
//
//   debug('Cron jobs scheduled');
// };
module.exports.init = () => {
    new CronJob('3 * * * * *', function () {
        console.log("helloczxZNdfadsklffklwadsflkfdfs____________________________________");
        // otpSchema.updateMany({
        //         ets: {
        //             $lt: helpers.dateSeconds()
        //         },
        //         sts: 'P'
        //     },
        //     {
        //         $set: {
        //             sts: 'E',
        //             uts: helpers.dateSeconds(),
        //             elogic: 'Cron, otp validity expired.'
        //         }
        //     })
        //     .then(updateManySuccess => {
        //     })
        //     .catch(updateManyFail => {
        //         console.log('[cron][expiry][mongoUpdateError]', updateManyFail)
        //     });
    }, null, true, 'America/Los_Angeles');
}