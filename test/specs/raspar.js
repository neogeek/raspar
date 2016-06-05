var expect = require('chai').expect;

var lib = process.env.COVERAGE ? '../../lib-cov' : '../../lib';

var raspar = require(lib + '/raspar');

describe('raspar', function () {

    before(function () {

        raspar.debug = true;

    });

    it('should make as basic request', function (done) {

        raspar.get('http://google.com/humans.txt').done(function (content) {

            expect(content).to.not.have.property('cache');

            done();

        });

    });

    it('should make as basic request (cached)', function (done) {

        raspar.get('http://google.com/humans.txt').done(function (content) {

            expect(content).to.have.property('cache');

            done();

        });

    });

    it('should make as basic request for an array of URLs', function (done) {

        raspar.get(['http://google.com/humans.txt']).done(function (contents) {

            expect(contents).to.have.length(1);

            done();

        });

    });

    it('should make as basic request and return an HTML object', function (done) {

        raspar.get('http://google.com/').done(function (content) {

            expect(content).to.have.property('$body');

            done();

        });

    });

    it('should make as basic request for an array of URLs and return an HTML object', function (done) {

        raspar.get(['http://google.com/']).done(function (contents) {

            expect(contents[0]).to.have.property('$body');

            done();

        });

    });

    it('should error on invalid URL', function (done) {

        raspar.get('test').catch(function (err) {

            done();

        });

    });

});
