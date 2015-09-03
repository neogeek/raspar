var q = require('q');
var async = require('async');

var request = require('request');

module.exports._requestFromUrl = function (url, callback) {

    request(url, function (err, res, body) {

        callback(err, res);

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

        module.exports._requestFromUrl(url, callback);

    }

    return deferred.promise;

};
