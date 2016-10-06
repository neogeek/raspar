'use strict';

const expect = require('chai').expect;

let lib = '../../lib';

if (process.env.COVERAGE) {

    lib = '../../lib-cov';

}

const raspar = require(`${lib}/raspar`);

const TIMEOUT = 3000;

describe('raspar', () => {

    it('should make a basic request (caching in temp file)', done => {

        raspar.fetch('http://google.com/humans.txt').then(res => {

            expect(res).to.have.property('body');
            expect(res).to.not.have.property('cached');

            done();

        });

    }).timeout(TIMEOUT);

    it('should make a basic request (cached in temp file)', done => {

        raspar.fetch('http://google.com/humans.txt', {
            'cacheDirectory': 'temp/cache/'
        }).then(res => {

            expect(res).to.have.property('body');
            expect(res).to.have.property('cached');

            done();

        });

    }).timeout(TIMEOUT);

    it('should make a basic request (caching in memory)', done => {

        raspar.fetch('http://google.com/humans.txt', {
            'cacheMemory': true
        }).then(res => {

            expect(res).to.have.property('body');
            expect(res).to.not.have.property('cached');

            done();

        });

    }).timeout(TIMEOUT);

    it('should make a basic request (cached in memory)', done => {

        raspar.fetch('http://google.com/humans.txt', {
            'cacheMemory': true
        }).then(res => {

            expect(res).to.have.property('body');
            expect(res).to.have.property('cached');

            done();

        });

    }).timeout(TIMEOUT);

    it('should make a basic request (expired cached in temp file)', done => {

        raspar.fetch('http://www.google.com/robots.txt', {
            'ttl': 1
        }).then(() => {

            setTimeout(() => {

                raspar.requestFromCache('http://www.google.com/robots.txt', {
                    'ttl': 1
                }).catch(() => {

                    done();

                });

            }, 1500);

        });

    }).timeout(TIMEOUT);

    it('should make a basic request (expired cached in memory)', done => {

        raspar.fetch('http://www.google.com/robots.txt', {
            'cacheMemory': true,
            'ttl': 1
        }).then(() => {

            setTimeout(() => {

                raspar.requestFromCache('http://www.google.com/robots.txt', {
                    'cacheMemory': true,
                    'ttl': 1
                }).catch(() => {

                    done();

                });

            }, 1500);

        });

    }).timeout(TIMEOUT);

    it('should make a basic request (no cache)', done => {

        raspar.fetch('http://google.com/humans.txt', {
            'cacheDirectory': false,
            'cacheMemory': false
        }).then(res => {

            expect(res).to.have.property('body');
            expect(res).to.not.have.property('cached');

            done();

        });

    }).timeout(TIMEOUT);

    it('should make a basic request for an array of URLs', done => {

        raspar.fetch([
            'http://google.com/humans.txt',
            'http://google.com/robots.txt'
        ]).then(res => {

            expect(res).to.have.length(2);
            expect(res[0]).to.have.property('body');

            done();

        });

    }).timeout(TIMEOUT);

    it('should error on invalid URL', done => {

        raspar.fetch('test').catch(() => {

            done();

        });

    }).timeout(TIMEOUT);

});
