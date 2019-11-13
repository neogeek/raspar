const fs = require('fs');
const {promisify} = require('util');

const checkCacheExpiry = require('./check-cache-expiry');

const readFile = promisify(fs.readFile);

const MILLISECONDS = 1000;

/**
 * Read cache from file only if cache hasn't expired.
 *
 * @example readCache('temp/cache.txt', 1800).then(contents => console.log(contents))
 * @param {String} path File path to read cache.
 * @param {Integer} ttl TTL (Time to live) in seconds.
 * @return {String}
 * @public
 */

const readCache = (path, ttl) => checkCacheExpiry(
    path,
    ttl * MILLISECONDS
)
    .then(() => readFile(
        path,
        'utf8'
    ));

module.exports = readCache;
