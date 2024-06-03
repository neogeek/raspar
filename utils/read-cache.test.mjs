import test, { afterEach } from 'node:test';
import assert from 'node:assert';

import { unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import writeCache from './write-cache.js';

const testFilePath = join(tmpdir(), 'temp.txt');

afterEach(async () => {
  await unlink(testFilePath);
});

test('Write new cached file', async () => {
  assert.ok(/temp/u.test(await writeCache(testFilePath, 'temp')));
});
