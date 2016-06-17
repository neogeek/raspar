const expect = require('chai').expect;

let lib = '../../lib';

if (process.env.COVERAGE) {

    lib = '../../lib-cov';

}

const raspar = require(`${lib}/raspar`);

describe('raspar', () => {

    it('should make as basic request (caching in temp file)', (done) => {

        raspar.get('http://google.com/humans.txt').then((content) => {

            expect(content).to.not.have.property('cached');

            done();

        });

    });

    it('should make as basic request (cached in temp file)', (done) => {

        raspar.get('http://google.com/humans.txt', {
            'cacheDirectory': 'temp/cache/'
        }).then((content) => {

            expect(content).to.have.property('cached');

            done();

        });

    });

    it('should make as basic request (caching in memory)', (done) => {

        raspar.get('http://google.com/humans.txt', {
            'cacheMemory': true
        }).then((content) => {

            expect(content).to.not.have.property('cached');

            done();

        });

    });

    it('should make as basic request (cached in memory)', (done) => {

        raspar.get('http://google.com/humans.txt', {
            'cacheMemory': true
        }).then((content) => {

            expect(content).to.have.property('cached');

            done();

        });

    });

    it('should make as basic request (expired cached in temp file)', (done) => {

        raspar.get('http://www.google.com/robots.txt', {
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

    });

    it('should make as basic request (expired cached in memory)', (done) => {

        raspar.get('http://www.google.com/robots.txt', {
            'ttl': 1,
            'cacheMemory': true
        }).then(() => {

            setTimeout(() => {

                raspar.requestFromCache('http://www.google.com/robots.txt', {
                    'ttl': 1,
                    'cacheMemory': true
                }).catch(() => {

                    done();

                });

            }, 1500);

        });

    });

    it('should make as basic request (no cache)', (done) => {

        raspar.get('http://google.com/humans.txt', {
            'cacheDirectory': false,
            'cacheMemory': false
        }).then((content) => {

            expect(content).to.not.have.property('cached');

            done();

        });

    });

    it('should make as basic request for an array of URLs', (done) => {

        raspar.get([
            'http://google.com/humans.txt',
            'http://google.com/robots.txt'
        ]).then((contents) => {

            expect(contents).to.have.length(2);

            done();

        });

    });

    it('should error on invalid URL', (done) => {

        raspar.get('test').catch(() => {

            done();

        });

    });

});
