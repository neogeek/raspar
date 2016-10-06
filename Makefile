BIN=node_modules/.bin

test:
	make lint
	@make clean
	$(BIN)/mocha ./test/specs/**.js -t 3000
	@make clean

lint:
	$(BIN)/eslint ./lib/
	$(BIN)/eslint ./test/

coverage:
	mkdir lib-es5 || exit 0;
	$(BIN)/spire-of-babel ./lib/raspar.js > ./lib-es5/raspar.js
	$(BIN)/jscoverage lib-es5 lib-cov
	@make clean
	COVERAGE=1 $(BIN)/mocha ./test/specs/**.js -t 3000 -R html-cov > coverage.html || exit 0;
	@make clean
	COVERAGE=1 $(BIN)/mocha ./test/specs/**/*.js -t 3000 -R mocha-reporter-cov-summary || exit 0;
	@make clean
	rm -rf ./lib-cov/
	rm -rf ./lib-es5/

docs:
	$(BIN)/doxdox lib/ --layout templates/DOCUMENTATION.hbs --output DOCUMENTATION.md

clean:
	@rm -rf ./temp/ || exit 0;

.PHONY: test
