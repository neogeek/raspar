BIN=node_modules/.bin

test:
	make lint
	@make clean
	$(BIN)/mocha test/specs/
	@make clean
	$(BIN)/doxdox 'lib/**/*.js' -p package.json -l markdown | diff DOCUMENTATION.md -

lint:
	$(BIN)/eslint lib/
	$(BIN)/eslint test/

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha test/specs/ && $(BIN)/codecov

docs:
	$(BIN)/doxdox 'lib/**/*.js' -p package.json -l markdown -o DOCUMENTATION.md

clean:
	@rm -rf temp/ || exit 0;

.PHONY: test coverage
