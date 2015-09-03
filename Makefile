test:
	rm -rf ./temp/cache/
	./node_modules/.bin/mocha ./test/specs/**.js

coverage:
	./node_modules/.bin/jscoverage lib lib-cov
	rm -rf ./temp/cache/
	COVERAGE=1 ./node_modules/.bin/mocha ./test/specs/**.js -R html-cov > coverage.html || exit 0;
	rm -rf lib-cov

.PHONY: test
