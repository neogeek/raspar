import { join } from 'node:path';

import nodeFetch from 'node-fetch';

import { generateUUID, readCache, writeCache } from '../utils/index.js';

const DEFAULT_CACHE_TTL = 1800;

/**
 * Request content from URL.
 *
 * @example const contents = await fetch('http://www.google.com/humans.txt');
 * @param {String} url A URL string.
 * @param {Object} [options] Options object.
 * @param {String} [options.cacheDirectory] Directory to store cache. Default is `temp/cache/`.
 * @param {Object} [options.requestOptions] Custom request options object. Default is `{}`.
 * @param {Number} [options.ttl] TTL (Time to live) in seconds. Default is 1800
 * @return {Object} Contents of request.
 * @public
 */

export const fetch = (
  url,
  {
    cacheDirectory = 'temp/cache/',
    requestOptions = {},
    ttl = DEFAULT_CACHE_TTL
  } = {}
) => {
  const uuid = generateUUID(url);

  const path = join(cacheDirectory, uuid);

  return readCache(path, ttl).catch(() =>
    nodeFetch(url, requestOptions)
      .then(res => res.text())
      .then(body => writeCache(path, body))
  );
};
