const { promises: fs } = require('fs');

const MILLISECONDS = 1000;

/**
 * Check to see if file has expired based on the given TTL.
 *
 * @example checkCacheExpiry('temp/cache.txt', 1800).catch(() => console.log('Cache has expired.'));
 * @param {String} path File path to check.
 * @param {Number} ttl TTL (Time to live) in seconds.
 * @return {Object} Promise
 * @public
 */

const checkCacheExpiry = (path, ttl) =>
    fs.stat(path).then(stats => {
        const ttlInMilliseconds = ttl * MILLISECONDS;

        if (new Date(stats.mtime).getTime() + ttlInMilliseconds < Date.now()) {
            return Promise.reject(new Error('Cache has expired.'));
        }

        return stats;
    });

module.exports = checkCacheExpiry;
