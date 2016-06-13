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

const ttl = 43200;

const memoryCache = cacheManager.caching({
    'store': 'memory',
    'max': 100,
    ttl
});

const getMemoryCache = promisify(memoryCache.get);
const setMemoryCache = promisify(memoryCache.set);

const milliseconds = 1000;

const OPTION_DEFAULTS = {
    'ttl': 86400,
    'cacheDirectory': 'temp/cache/',
    'cacheMemory': false
};

const requestFromUrl = (url, options) => {

    const settings = Object.assign({}, OPTION_DEFAULTS, options);

    const hash = crypto.createHash('sha1')
        .update(url)
        .digest('hex');

    return request(url)
        .then((res) => {

            if (settings.cacheMemory) {

                return setMemoryCache(hash, JSON.stringify(res)).then(() => res);

            } else if (settings.cacheDirectory) {

                const cachePath = path.join(settings.cacheDirectory, hash);

                return mkdirp(settings.cacheDirectory)
                    .then(() => writeFile(cachePath, JSON.stringify(res.toJSON())))
                    .then(() => res);

            }

            return res;

        });

};

const formatCache = (res) => Object.assign(JSON.parse(res), {'cached': true});

const requestFromCache = (url, options) => {

    const settings = Object.assign({}, OPTION_DEFAULTS, options);

    const hash = crypto.createHash('sha1')
        .update(url)
        .digest('hex');

    if (settings.cacheMemory) {

        return getMemoryCache(hash).then((result) => {

            if (!result) {

                throw new Error('Current request not in cache.');

            }

            return formatCache(result);

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

    throw new Error('No cache requested');

};

const requestFromUrlorCache = (url, options) => requestFromCache(url, options)
    .catch(() => requestFromUrl(url, options));

const get = (input, options) => {

    if (Array.isArray(input)) {

        return Promise.all(input, (url) => requestFromUrlorCache(url, options));

    }

    return requestFromUrlorCache(input, options);

};

module.exports = {
    get
};
