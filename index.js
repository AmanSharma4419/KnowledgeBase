require('dotenv').config();
// require('debug-to-file');

const debug = require('debug')('app:index');

const { startServer } = require('./src/app');

(async () => {
  debug('starting app...');
  await startServer();
  debug('app started...');
})();
