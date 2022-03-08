const { join } = require('path');

const del = require('del');

const { fetch } = require('../lib/raspar');

beforeEach(() => del(join(__dirname, '../temp')));

test('Fetch contents', () =>
    expect(fetch('https://www.google.com/robots.txt')).resolves.toContain(
        'User-agent: *'
    ));

test('Fetch contents from cache', async () => {
    await fetch('https://www.google.com/robots.txt');

    expect(fetch('https://www.google.com/robots.txt')).resolves.toContain(
        'User-agent: *'
    );
});

test('Fetch contents from array of urls', async () => {
    expect(fetch(['https://www.google.com/robots.txt'])).resolves.toEqual(
        expect.arrayContaining([expect.stringContaining('User-agent: *')])
    );
});
