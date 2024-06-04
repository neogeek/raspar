import test from 'node:test';
import assert from 'node:assert';

import { fetchFromUrl } from './raspar.js';

test('Fetch URL', async () => {
  assert.ok(/Example Domain/.test(await fetchFromUrl('https://example.com/')));
});
