const fs = require('fs');
const {join} = require('path');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const mkdirp = promisify(require('mkdirp'));
const request = promisify(require('request'));

const checkCacheExpiry = require('../utils/check-cache-expiry');
const generateUUID = require('../utils/generate-uuid');

const DEFAULT_CACHE_TTL = 3600;

const MILLISECONDS = 1000;

const requestFromUrlorCache = (url, {
    cacheDirectory = 'temp/cache/',
    requestOptions = {},
    ttl = DEFAULT_CACHE_TTL
} = {}) => {

    const uuid = generateUUID(url);

    const path = join(
        cacheDirectory,
        uuid
    );

    return checkCacheExpiry(
        path,
        ttl * MILLISECONDS
    )
        .then(() => readFile(
            path,
            'utf8'
        ))
        .catch(() =>
            request(
                url,
                requestOptions
            ).then(({body}) =>
                mkdirp(cacheDirectory).then(() =>
                    writeFile(
                        path,
                        body
                    ).then(() => body))));

};

const fetch = (urls, options) => {

    if (Array.isArray(urls)) {

        return Promise.all(urls.map(url => requestFromUrlorCache(
            url,
            options
        )));

    }

    return requestFromUrlorCache(
        urls,
        options
    );

};

module.exports = {
    fetch,
    requestFromUrlorCache
};
