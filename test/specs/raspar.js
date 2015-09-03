var lib = process.env.COVERAGE ? '../../lib-cov' : '../../lib';

var raspar = require(lib + '/raspar');

describe('raspar', function () {

    it('should make as basic request', function (done) {

        raspar.get('http://google.com/humans.txt').done(function (content) {

            done();

        });

    });

    it('should make as basic request (cached)', function (done) {

        raspar.get(['http://google.com/humans.txt']).done(function (content) {

            done();

        });

    });

    it('should error on invalid URL', function (done) {

        raspar.get('test').catch(function (err) {

            done();

        });

    });

});
