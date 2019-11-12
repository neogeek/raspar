const crypto = require('crypto');

const generateUUID = url => crypto
    .createHash('sha1')
    .update(url)
    .digest('hex');

module.exports = generateUUID;
