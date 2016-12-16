BIN=node_modules/.bin

test:
	make lint
	@make clean
	$(BIN)/mocha test/specs/
	@make clean

lint:
	$(BIN)/eslint lib/
	$(BIN)/eslint test/

coverage:
	$(BIN)/istanbul cover $(BIN)/_mocha test/specs/ && $(BIN)/codecov

clean:
	@rm -rf temp/ || exit 0;

.PHONY: test coverage
