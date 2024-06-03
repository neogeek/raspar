import test from 'node:test';
import assert from 'node:assert';

import generateUUID from './generate-uuid.js';

test('Generate UUID from string', async () => {
  assert.equal(
    generateUUID('test'),
    '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  );
});
