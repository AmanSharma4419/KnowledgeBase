const redis = require('redis');
const debug = require('debug')('app:redisHelper');

const { REDIS_HOST, REDIS_PORT, REDIS_DB, REDIS_PASSWORD } = require('./../appConfig');

let client = null;

module.exports.connect = async () => {
  return new Promise((resolve) => {
    client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT, db: REDIS_DB, password: REDIS_PASSWORD });

    // client.auth(REDIS_PASSWORD);

    client.on('connect', function () {
      debug('redis connected');

      return resolve();
    });

    client.on('error', function (error) {
      debug(error);

      return resolve();
    });
  });
};

module.exports.storeHash = async ({ key, value, expiryInMinutes = 20 }) => {
  console.log(key, value, "bkk")
  return new Promise(async (resolve, reject) => {
    if (!client) {
      await this.connect();
    }

    client.hmset(key, value, (e) => {
      if (e) {
        debug(e);
        return reject(e);
      }

      // Expire in `expiryInMinutes` (default 20) minutes
      client.expire(key, expiryInMinutes * 60, (e) => {
        if (e) {
          debug(e);
          return reject(e);
        }

        debug(`${key} saved in redis`);
        return resolve();
      });
    });
  });
};

module.exports.getHash = async ({ key, field }) => {
  return new Promise(async (resolve, reject) => {
    if (!client) {
      await this.connect();
    }
    console.log(key, ":: ", field)
    client.hget(key, field, (e, res) => {
      if (e) {
        debug(e);
        return reject(e);
      }
      return resolve(res);
    });
  });
};


module.exports.deleteKey = async ({ key }) => {
  if (!client) {
    await this.connect();
  }

  return new Promise(async (resolve, reject) => {
    client.del(key, (e) => {
      if (e) {
        debug(e);
        return reject(e);
      }

      debug(`${key} deleted from redis`);

      return resolve();
    });
  });
};
