const {join} = require('path');
const {promisify} = require('util');

const request = promisify(require('request'));

const {generateUUID, readCache, writeCache} = require('../utils/');

const DEFAULT_CACHE_TTL = 1800;

/**
 * Request content from URL.
 *
 * @example fetchFromUrl('http://www.google.com/humans.txt').then(content => console.log(content));
 * @param {String} url A URL string.
 * @param {Object} [options] Options object.
 * @param {String} [options.cacheDirectory] Directory to store cache. Defaults to `temp/cache/`.
 * @param {Object} [options.requestOptions] Custom request options object.
 * @param {Integer} [options.ttl] TTL (Time to live) in seconds. Default: 1800
 * @return {Object} Promise
 * @private
 */

const fetchFromUrl = (url, {
    cacheDirectory = 'temp/cache/',
    requestOptions = {},
    ttl = DEFAULT_CACHE_TTL
} = {}) => {

    const uuid = generateUUID(url);

    const path = join(
        cacheDirectory,
        uuid
    );

    return readCache(
        path,
        ttl
    )
        .catch(() =>
            request(
                url,
                requestOptions
            ).then(({body}) => writeCache(
                path,
                body
            )));

};

/**
 * Request content from URL or array of URLs.
 *
 * @example fetch('http://www.google.com/humans.txt').then(content => console.log(content));
 * @example fetch(['http://www.google.com/humans.txt']).then(contents => console.log(content[0]));
 * @param {String|Array} url A URL or an array of URL strings.
 * @param {Object} [options] Options object.
 * @param {String} [options.cacheDirectory] Directory to store cache. Defaults to `temp/cache/`.
 * @param {Object} [options.requestOptions] Custom request options object.
 * @param {Integer} [options.ttl] TTL (Time to live) in seconds. Default: 1800
 * @return {Object} Promise
 * @private
 */

const fetch = (urls, options) => {

    if (Array.isArray(urls)) {

        return Promise.all(urls.map(url => fetchFromUrl(
            url,
            options
        )));

    }

    return fetchFromUrl(
        urls,
        options
    );

};

module.exports = {
    fetch,
    fetchFromUrl
};
