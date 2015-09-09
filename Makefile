test:
	rm -rf ./temp/
	./node_modules/.bin/mocha ./test/specs/**.js
	rm -rf ./temp/

coverage:
	./node_modules/.bin/jscoverage lib lib-cov
	rm -rf ./temp/
	COVERAGE=1 ./node_modules/.bin/mocha ./test/specs/**.js -R html-cov > coverage.html || exit 0;
	rm -rf ./temp/
	COVERAGE=1 ./node_modules/.bin/mocha ./test/specs/**/*.js -R mocha-reporter-cov-summary || exit 0;
	rm -rf lib-cov
	rm -rf ./temp/

.PHONY: test
