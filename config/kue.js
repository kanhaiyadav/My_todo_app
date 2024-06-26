const redisConfig = {
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',  // Default to localhost
        port: process.env.REDIS_PORT || 6379,        // Default Redis port
        auth: process.env.REDIS_PASSWORD             // Optional password
    }
};
const kue = require('kue');

const queue = kue.createQueue(redisConfig);

module.exports = queue;