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

    it('should make as basic request for an array of URLs', (done) => {

        raspar.get(['http://google.com/humans.txt']).then((contents) => {

            expect(contents).to.have.length(1);

            done();

        });

    });

    it('should error on invalid URL', (done) => {

        raspar.get('test').catch(() => {

            done();

        });

    });

});
