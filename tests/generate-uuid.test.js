const generateUUID = require('../utils/generate-uuid');

test('Generate UUID from string', () =>
    expect(generateUUID('test')).toBe(
        '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    ));
