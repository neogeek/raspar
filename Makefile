BIN=node_modules/.bin

test:
	make lint
	@make clean
	$(BIN)/mocha ./test/specs/**.js
	@make clean

lint:
	$(BIN)/eslint ./lib
	$(BIN)/eslint ./test

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha ./test/specs && $(BIN)/codecov

docs:
	$(BIN)/doxdox lib/ --layout templates/DOCUMENTATION.hbs --output DOCUMENTATION.md

clean:
	@rm -rf ./temp || exit 0;

.PHONY: test coverage
