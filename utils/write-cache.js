const fs = require('fs');
const {dirname} = require('path');
const {promisify} = require('util');

const writeFile = promisify(fs.writeFile);

const mkdirp = promisify(require('mkdirp'));

const writeCache = (path, content) =>
    mkdirp(dirname(path)).then(() =>
        writeFile(
            path,
            content
        ))
        .then(() => content);

module.exports = writeCache;
