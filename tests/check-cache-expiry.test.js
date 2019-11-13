const {join} = require('path');

const checkCacheExpiry = require('../utils/check-cache-expiry');

test(
    'Check cache for missing file',
    () => {

        expect(checkCacheExpiry(join(
            __dirname,
            '/mocks/missing-file.txt'
        ))).rejects.toThrowError(/ENOENT/u);

    }
);

test(
    'Check cache for existing file',
    () => {

        expect(checkCacheExpiry(join(
            __dirname,
            '/mocks/cache.txt'
        ))).resolves.toBeTruthy();

    }
);

test(
    'Check cache for expired file',
    () => {

        expect(checkCacheExpiry(
            join(
                __dirname,
                '/mocks/cache.txt'
            ),
            -1
        )).rejects.toThrowError(/expired/u);

    }
);
