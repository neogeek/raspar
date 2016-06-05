BIN=node_modules/.bin

test:
	@make clean
	$(BIN)/mocha ./test/specs/**.js
	@make clean

coverage:
	$(BIN)/jscoverage lib lib-cov
	@make clean
	COVERAGE=1 $(BIN)/mocha ./test/specs/**.js -R html-cov > coverage.html || exit 0;
	@make clean
	COVERAGE=1 $(BIN)/mocha ./test/specs/**/*.js -R mocha-reporter-cov-summary || exit 0;
	@make clean
	rm -rf ./lib-cov/

clean:
	@rm -rf ./temp/ || exit 0;

.PHONY: test
