install:
	asdf install || true
	npm install

dev:
	npm run dev

dev-storybook:
	npm run storybook

lint:
	npm run lint
	npm run typecheck

fix:
	npm run fix
	npm run typecheck

test:
	npm run test

test-watch:
	npm run test:watch