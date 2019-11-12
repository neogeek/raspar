const {join} = require('path');
const {promisify} = require('util');

const request = promisify(require('request'));

const {generateUUID, readCache, writeCache} = require('../utils/');

const DEFAULT_CACHE_TTL = 3600;

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
