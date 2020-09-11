const { utimesSync } = require('fs');
const { join } = require('path');

const readCache = require('../utils/read-cache');

const testFilePath = join(__dirname, '/mocks/cache.txt');

beforeEach(() => {
    const time = new Date();

    utimesSync(testFilePath, time, time);
});

test('Get contents of cached file', () =>
    expect(readCache(testFilePath, 1800)).resolves.toMatch(/cache/u));
