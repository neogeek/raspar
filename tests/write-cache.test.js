const {join} = require('path');

const del = require('del');

const writeCache = require('../utils/write-cache');

beforeAll(() => del(join(
    __dirname,
    '../temp'
)));

test(
    'Write new cached file',
    () => {

        expect(writeCache(
            join(
                __dirname,
                '../temp/temp.txt'
            ),
            'temp'
        )).resolves.toMatch(/temp/u);

    }
);

afterAll(() => del(join(
    __dirname,
    '../temp'
)));
