var raspar = require('../../lib/raspar');

describe('raspar', function () {

    it('should make as basic request', function (done) {

        var urls = [
            'http://google.com/humans.txt'
        ];

        raspar.get(urls).done(function (contents) {

            console.log(contents[0].body);

            done();

        });

    });

});
