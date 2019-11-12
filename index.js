const {fetch, requestFromUrlorCache} = require('./lib/raspar');
const checkCacheExpiry = require('./utils/check-cache-expiry');
const generateUUID = require('./utils/generate-uuid');

module.exports = {
    checkCacheExpiry,
    fetch,
    generateUUID,
    requestFromUrlorCache
};
