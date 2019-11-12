const fs = require('fs');
const {promisify} = require('util');

const stat = promisify(fs.stat);

const checkCacheExpiry = (path, ttl) =>
    stat(path).then(stats => {

        if (new Date(stats.mtime).getTime() + ttl < Date.now()) {

            throw new Error('Cache has expired.');

        }

        return stats;

    })
        .catch(() => {

            throw new Error('Cache is missing.');

        });

module.exports = checkCacheExpiry;
