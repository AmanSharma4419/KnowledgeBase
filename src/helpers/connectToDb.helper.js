const mongoose = require('mongoose');
const debug = require('debug')('app:connectToDbHelper');

const { MONGODB_URL, ENVIRONMENT } = require('../appConfig');

module.exports = async () => {
  const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
  // connect to database.
  await mongoose.connect(MONGODB_URL, options);





  if (ENVIRONMENT === 'test') {
    await mongoose.connection.db.dropDatabase();
  }

  debug(`Connected to ${MONGODB_URL}`);
};
