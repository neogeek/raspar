import test, { beforeEach } from 'node:test';
import assert from 'node:assert';

import { utimesSync } from 'node:fs';

import checkCacheExpiry from './check-cache-expiry.js';

const testFilePath = './test/mocks/cache.txt';

beforeEach(() => {
  const time = new Date();

  utimesSync(testFilePath, time, time);
});

test('Check cache for missing file', async () => {
  assert.rejects(
    async () => await checkCacheExpiry('./test/mocks/missing-file.txt', 1800),
    { message: /ENOENT/ }
  );
});

test('Check cache for existing file', async () => {
  assert.ok(checkCacheExpiry(testFilePath, 1800));
});

test('Check cache for expired file', async () => {
  assert.rejects(async () => await checkCacheExpiry(testFilePath, -1), {
    message: /expired/
  });
});
