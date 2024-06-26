const redisConfig = {
    redis: {
        host: '172.31.46.223',  // Default to localhost
        port: 6379,        // Default Redis port
    }
};
const kue = require('kue');

const queue = kue.createQueue(redisConfig);

module.exports = queue;