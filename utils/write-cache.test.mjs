import test, { beforeEach } from 'node:test';
import assert from 'node:assert';

import { utimesSync } from 'node:fs';

import readCache from './read-cache.js';

const testFilePath = './test/mocks/cache.txt';

beforeEach(() => {
  const time = new Date();

  utimesSync(testFilePath, time, time);
});

test('Get contents of cached file', async () => {
  assert.ok(/cache/.test(await readCache(testFilePath, 1800)));
});
