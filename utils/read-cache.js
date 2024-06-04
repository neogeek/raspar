import { readFile } from 'node:fs/promises';

import checkCacheExpiry from './check-cache-expiry.js';

/**
 * Read cache from file only if cache hasn't expired.
 *
 * @example readCache('temp/cache.txt', 1800).then(contents => console.log(contents))
 * @param {String} path File path to read cache.
 * @param {Number} ttl TTL (Time to live) in seconds.
 * @return {Object} Promise
 * @public
 */

const readCache = (path, ttl) =>
  checkCacheExpiry(path, ttl).then(() => readFile(path, 'utf8'));

export default readCache;
