const fs = require('fs');
const {promisify} = require('util');

const checkCacheExpiry = require('./check-cache-expiry');

const readFile = promisify(fs.readFile);

const MILLISECONDS = 1000;

const readCache = (path, ttl) => checkCacheExpiry(
    path,
    ttl * MILLISECONDS
)
    .then(() => readFile(
        path,
        'utf8'
    ));

module.exports = readCache;
