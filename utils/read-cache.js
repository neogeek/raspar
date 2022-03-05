const { promises: fs } = require('fs');

const checkCacheExpiry = require('./check-cache-expiry');

/**
 * Read cache from file only if cache hasn't expired.
 *
 * @example readCache('temp/cache.txt', 1800).then(contents => console.log(contents))
 * @param {String} path File path to read cache.
 * @param {Number} ttl TTL (Time to live) in seconds.
 * @return {Object} Promise
 * @public
 */

const readCache = (path, ttl) =>
    checkCacheExpiry(path, ttl).then(() => fs.readFile(path, 'utf8'));

module.exports = readCache;
