const { required } = require('@hapi/joi');

module.exports = {
  models: require('./models'),
  messages: require('./messages'),
  enums: require('./enums'),
  messageContent: require('./messageContent'),
};
