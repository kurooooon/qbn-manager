install:
	asdf install || true
	npm install

dev:
	npm run dev

dev-storybook:
	npm run storybook

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint
	npm run typecheck
	npm run cspell

fix:
	npm run fix
	npm run typecheck
	npm run cspell

test:
	npm run test

test-watch:
	npm run test:watch