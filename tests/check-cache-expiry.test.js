const {utimesSync} = require('fs');
const {join} = require('path');

const checkCacheExpiry = require('../utils/check-cache-expiry');

beforeEach(() => {

    const time = new Date();

    utimesSync(
        join(
            __dirname,
            '/mocks/cache.txt'
        ),
        time,
        time
    );

});

test(
    'Check cache for missing file',
    () => expect(checkCacheExpiry(join(
        __dirname,
        '/mocks/missing-file.txt'
    ))).rejects.toThrowError(/ENOENT/u)
);

test(
    'Check cache for existing file',
    () => expect(checkCacheExpiry(join(
        __dirname,
        '/mocks/cache.txt'
    ))).resolves.toBeTruthy()
);

test(
    'Check cache for expired file',
    () => expect(checkCacheExpiry(
        join(
            __dirname,
            '/mocks/cache.txt'
        ),
        -1
    )).rejects.toThrowError(/expired/u)
);
