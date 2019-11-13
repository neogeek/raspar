const fs = require('fs');
const {promisify} = require('util');

const stat = promisify(fs.stat);

/**
 * Check to see if file has expired based on the given TTL.
 *
 * @example checkCacheExpiry('temp/cache.txt', 1800).catch(() => console.log('Cache has expired.'));
 * @param {String} path File path to check.
 * @param {Integer} ttl TTL (Time to live) in seconds.
 * @return {Object} Promise
 * @public
 */

const checkCacheExpiry = (path, ttl) =>
    stat(path).then(stats => {

        if (new Date(stats.mtime).getTime() + ttl < Date.now()) {

            return Promise.reject(new Error('Cache has expired.'));

        }

        return stats;

    });

module.exports = checkCacheExpiry;
