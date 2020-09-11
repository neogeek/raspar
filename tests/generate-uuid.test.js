const generateUUID = require('../utils/generate-uuid');

test('Generate UUID from string', () =>
    expect(generateUUID('test')).toBe(
        'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3'
    ));
