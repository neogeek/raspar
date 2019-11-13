const {utimesSync} = require('fs');
const {join} = require('path');

const readCache = require('../utils/read-cache');

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
    'Get contents of cached file',
    () => expect(readCache(join(
        __dirname,
        '/mocks/cache.txt'
    ))).resolves.toMatch(/cache/u)
);
