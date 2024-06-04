import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

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
  mkdir(dirname(path), { recursive: true })
    .then(() => writeFile(path, content))
    .then(() => content);

export default writeCache;
