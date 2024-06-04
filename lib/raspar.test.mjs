import test from 'node:test';
import assert from 'node:assert';

import { fetch } from './raspar.js';

test('Fetch URL', async () => {
  assert.ok(/Example Domain/.test(await fetch('https://example.com/')));
});
