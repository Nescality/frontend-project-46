.PHONY: install test lint fix help

install: ## Install dependencies
	npm ci

test: ## Run tests
	npm test

lint: ## Run linter
	npm run lint

fix: ## Fix linting errors
	npm run lint -- --fix

help: ## Display this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
