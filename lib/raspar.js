const fs = require('fs');
const {dirname, join} = require('path');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const mkdirp = promisify(require('mkdirp'));
const request = promisify(require('request'));

const checkCacheExpiry = require('../utils/check-cache-expiry');
const generateUUID = require('../utils/generate-uuid');

const DEFAULT_CACHE_TTL = 3600;

const MILLISECONDS = 1000;

const writeCache = (path, content) =>
    mkdirp(dirname(path)).then(() =>
        writeFile(
            path,
            content
        ))
        .then(() => content);

const readCache = (path, ttl) => checkCacheExpiry(
    path,
    ttl * MILLISECONDS
)
    .then(() => readFile(
        path,
        'utf8'
    ));

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
