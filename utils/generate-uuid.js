const crypto = require('crypto');

const generateUUID = content => crypto
    .createHash('sha1')
    .update(content)
    .digest('hex');

module.exports = generateUUID;
