const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

const mkdirp = require('mkdirp');

/**
 * Write cache contents to file. Will create directories if they don't exist.
 *
 * @example writeCache('temp/cache.txt', 'cached contents').then(content => console.log(content));
 * @param {String} path File path to store cache.
 * @param {String} content Contents of cache.
 * @return {Object} Promise
 * @public
 */

const writeCache = (path, content) =>
    mkdirp(dirname(path))
        .then(() => writeFile(path, content))
        .then(() => content);

module.exports = writeCache;
