const { utimesSync } = require('fs');
const { join } = require('path');

const checkCacheExpiry = require('../utils/check-cache-expiry');

const testFilePath = join(__dirname, '/mocks/cache.txt');

beforeEach(() => {
    const time = new Date();

    utimesSync(testFilePath, time, time);
});

test('Check cache for missing file', () =>
    expect(
        checkCacheExpiry(join(__dirname, '/mocks/missing-file.txt'), 1800)
    ).rejects.toThrowError(/ENOENT/u));

test('Check cache for existing file', () =>
    expect(checkCacheExpiry(testFilePath, 1800)).resolves.toBeTruthy());

test('Check cache for expired file', () =>
    expect(checkCacheExpiry(testFilePath, -1)).rejects.toThrowError(
        /expired/u
    ));
