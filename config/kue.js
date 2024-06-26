// const redisConfig = {
//     redis: {
//         host: REDIS_HOST || '172.31.46.223',  // Default to localhost
//         port: REDIS_PORT || 6379,        // Default Redis port
//     }
// };
const kue = require('kue');

// const queue = kue.createQueue(redisConfig);
const queue = kue.createQueue();

module.exports = queue;