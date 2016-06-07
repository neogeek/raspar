BIN=node_modules/.bin

test:
	# make lint
	@make clean
	$(BIN)/mocha ./test/specs/**.js
	@make clean

lint:
	$(BIN)/eslint ./lib/raspar.js
	$(BIN)/eslint ./test/specs

coverage:
	$(BIN)/jscoverage lib lib-cov
	@make clean
	COVERAGE=1 $(BIN)/mocha ./test/specs/**.js -R html-cov > coverage.html || exit 0;
	@make clean
	COVERAGE=1 $(BIN)/mocha ./test/specs/**/*.js -R mocha-reporter-cov-summary || exit 0;
	@make clean
	rm -rf ./lib-cov/

docs:
	$(BIN)/doxdox lib/ --layout templates/DOCUMENTATION.hbs --output DOCUMENTATION.md

setup:
	rm -rf config/eslint-coding-standards || exit 0;
	(cd config && curl -L https://github.com/neogeek/eslint-coding-standards/archive/master.tar.gz | tar -xz && mv eslint-coding-standards-master eslint-coding-standards)

clean:
	@rm -rf ./temp/ || exit 0;

.PHONY: test
