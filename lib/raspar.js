var crypto = require('crypto');
var fs = require('fs');

var q = require('q');

var async = require('async');

var mkdirp = require('mkdirp');

var request = require('request');

var cheerio = require('cheerio');

module.exports.cheerio = module.exports.$ = cheerio;

module.exports.debug = false;
module.exports.ttl = 60 * 60 * 24;
module.exports.cacheDirectory = './temp/cache/';

module.exports._requestFromUrl = function (url, callback) {

    var hash = crypto.createHash('sha1').update(url).digest('hex');

    fs.stat(module.exports.cacheDirectory + hash, function (err, stats) {

        if (stats && ((Date.now() - stats.ctime.getTime()) / 1000) < module.exports.ttl) {

            if (module.exports.debug) {

                console.log('CACHED: ' + url);

            }

            fs.readFile(module.exports.cacheDirectory + hash, 'utf8', function (err, res) {

                res = JSON.parse(res);

                res.cache = true;

                if (res.headers['content-type'].match(/html/)) {

                    res.$body = cheerio.load(res.body).root();

                }

                callback(err, res);

            });

        } else {

            if (module.exports.debug) {

                console.log('FETCHING: ' + url);

            }

            request(url, function (err, res, body) {

                if (!err) {

                    mkdirp(module.exports.cacheDirectory, function () {

                        fs.writeFile(module.exports.cacheDirectory + hash, JSON.stringify(res.toJSON()), function () {

                            if (res.headers['content-type'].match(/html/)) {

                                console.log('tst');

                                res.$body = cheerio.load(res.body);

                            }

                            callback(err, res);

                        });

                    });

                } else {

                    callback(err);

                }

            });

        }

    });

};

module.exports.get = function (input) {

    var deferred = new q.defer();

    function callback (err, contents) {

        if (err) {

            deferred.reject(new Error(err));

        } else {

            deferred.resolve(contents);

        }

    }

    if (Array.isArray(input)) {

        async.map(input, module.exports._requestFromUrl, callback);

    } else {

        module.exports._requestFromUrl(input, callback);

    }

    return deferred.promise;

};
