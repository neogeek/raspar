const crypto = require('crypto');
const fs = require('fs');

const promisify = require('es6-promisify');

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const mkdirp = promisify(require('mkdirp'));

const request = promisify(require('request'));

const ttl = 86400;
const milliseconds = 1000;
const cacheDirectory = './temp/cache/';

/**
 *
 *
 * @example raspar.get('http://www.google.com/').done(function (res) { });
 * @param {String} input URL
 * @return {Object} Promise
 * @private
 */

const requestFromUrl = (url) => {

    const hash = crypto.createHash('sha1')
        .update(url)
        .digest('hex');

    return request(url)
        .then((res) => mkdirp(cacheDirectory)
                .then(() => writeFile(cacheDirectory + hash, JSON.stringify(res.toJSON())))
                .then(() => res)

        );

};

const requestFromUrlorCache = (url) => {

    const hash = crypto.createHash('sha1')
        .update(url)
        .digest('hex');

    return stat(cacheDirectory + hash)
        .then((stats) => {

            if (stats && ((Date.now() - stats.ctime.getTime()) / milliseconds) < ttl) {

                return readFile(cacheDirectory + hash, 'utf8').then((res) => {

                    const content = JSON.parse(res);

                    content.cached = true;

                    return content;

                });

            }

            return requestFromUrl(url);

        })
        .catch(() => requestFromUrl(url));

};

/**
 *
 *
 * @example raspar.get('http://www.google.com/').done(function (res) { });
 * @param {String|Array} input File path.
 * @return {Object} Promise
 * @public
 */

const get = (input) => {

    if (Array.isArray(input)) {

        return Promise.all(input, requestFromUrlorCache);

    }

    return requestFromUrlorCache(input);

};

module.exports = {
    ttl,
    cacheDirectory,
    requestFromUrl,
    get
};
