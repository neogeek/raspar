const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const promisify = require('es6-promisify');

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const mkdirp = promisify(require('mkdirp'));

const request = promisify(require('request'));

const cacheManager = require('cache-manager');

const memoryCache = cacheManager.caching({
    'max': 100,
    'store': 'memory'
});

const getMemoryCache = promisify(memoryCache.get);
const setMemoryCache = promisify(memoryCache.set);

const milliseconds = 1000;

const OPTION_DEFAULTS = {
    'cacheDirectory': 'temp/cache/',
    'cacheMemory': false,
    'ttl': 86400
};

/**
 * Request URL from remote resource.
 *
 * @example raspar.requestFromUrl('http://www.google.com/humans.txt').then((res) => {});
 * @param {String} url A URL string.
 * @param {Object} [options] Options object.
 * @param {Boolean} [options.ttl] TTL (Time to live) for local/memory based cache.
 * @param {Boolean} [options.cacheDirectory] Directory to store cache. Defaults to `temp/cache/`.
 * @param {Boolean} [options.cacheMemory] Store cache in memory instead of local files. Defaults to `false`.
 * @return {Object} Promise
 * @private
 */

const requestFromUrl = (url, options = {}) => {

    const settings = Object.assign({}, OPTION_DEFAULTS, options);

    const hash = crypto.createHash('sha1')
        .update(url)
        .digest('hex');

    return request(url)
        .then((res) => {

            if (settings.cacheMemory) {

                return setMemoryCache(hash, JSON.stringify(res), {
                    'ttl': settings.ttl
                }).then(() => res);

            } else if (settings.cacheDirectory) {

                const cachePath = path.join(settings.cacheDirectory, hash);

                return mkdirp(settings.cacheDirectory)
                    .then(() => writeFile(cachePath, JSON.stringify(res)))
                    .then(() => res);

            }

            return res;

        });

};

/**
 * Parses local cache and adds cached property to the returned result.
 *
 * @example raspar.formatCache({}).then((res) => { console.log(res.cached); });
 * @param {Object} [res] Stored cache response.
 * @return {Object} Modified object with new cached property.
 * @private
 */

const formatCache = (res = {}) => Object.assign({}, JSON.parse(res), {'cached': true});

/**
 * Requests a URL from cache.
 *
 * @example raspar.requestFromCache('http://www.google.com/humans.txt').then((res) => {});
 * @param {String} url A URL string.
 * @param {Object} [options] Options object.
 * @param {Boolean} [options.ttl] TTL (Time to live) for local/memory based cache.
 * @param {Boolean} [options.cacheDirectory] Directory to store cache. Defaults to `temp/cache/`.
 * @param {Boolean} [options.cacheMemory] Store cache in memory instead of local files. Defaults to `false`.
 * @return {Object} Promise
 * @private
 */

const requestFromCache = (url, options = {}) => {

    const settings = Object.assign({}, OPTION_DEFAULTS, options);

    const hash = crypto.createHash('sha1')
        .update(url)
        .digest('hex');

    if (settings.cacheMemory) {

        return getMemoryCache(hash).then((res) => {

            if (!res) {

                throw new Error('Current request not in cache.');

            }

            return formatCache(res);

        });

    } else if (settings.cacheDirectory) {

        const cachePath = path.join(settings.cacheDirectory, hash);

        return stat(cachePath)
            .then((stats) => {

                if (stats && ((Date.now() - stats.mtime.getTime()) / milliseconds) < settings.ttl) {

                    return readFile(cachePath, 'utf8').then(formatCache);

                }

                throw new Error('File no longer in cache');

            });

    }

    return new Promise(() => {

        throw new Error('No cache requested');

    });

};

/**
 * Requests a URL from either local cache or remote resource.
 *
 * @example raspar.requestFromUrlorCache('http://www.google.com/humans.txt').then((res) => {});
 * @param {String} url A URL string.
 * @param {Object} [options] Options object.
 * @param {Boolean} [options.ttl] TTL (Time to live) for local/memory based cache.
 * @param {Boolean} [options.cacheDirectory] Directory to store cache. Defaults to `temp/cache/`.
 * @param {Boolean} [options.cacheMemory] Store cache in memory instead of local files. Defaults to `false`.
 * @return {Object} Promise
 * @private
 */

const requestFromUrlorCache = (url, options = {}) => requestFromCache(url, options)
    .catch(() => requestFromUrl(url, options));

/**
 * Requests a URL or an array of URLs.
 *
 * @example raspar.get('http://www.google.com/humans.txt').then((res) => {});
 * @example raspar.get(['http://www.google.com/humans.txt']).then((res) => {});
 * @param {String|Array} url Either a URL string or an array of URLs.
 * @param {Object} [options] Options object.
 * @param {Boolean} [options.ttl] TTL (Time to live) for local/memory based cache.
 * @param {Boolean} [options.cacheDirectory] Directory to store cache. Defaults to `temp/cache/`.
 * @param {Boolean} [options.cacheMemory] Store cache in memory instead of local files. Defaults to `false`.
 * @return {Object} Promise
 * @public
 */

const get = (input, options = {}) => {

    if (Array.isArray(input)) {

        return Promise.all(input.map((url) => requestFromUrlorCache(url, options)));

    }

    return requestFromUrlorCache(input, options);

};

module.exports = {
    formatCache,
    get,
    requestFromCache,
    requestFromUrl,
    requestFromUrlorCache
};
