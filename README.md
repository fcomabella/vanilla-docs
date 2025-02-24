# Vanilla Docs

This application is a simple mockup for a Document manager.

## Requirements

This project requires node version >= 22 and yarn.

## Installation and running

To run this project, clone it `git clone git@github.com:fcomabella/vanilla-docs.git`

Once it is cloned you must install dependencies with: `yarn install`

After installing the dependencies, you can:

- Run the unit tests with `yarn test:ci` or `yarn test:ci:coverage`
- Run the development server with `yarn dev`
- Build a production version `yarn build`
- Preview the production version `yarn preview`

> [!IMPORTANT]
> To see the document list the server must be running.
>
> Read the [server README](server/README.md) for more details.

## Dependencies

This project has the following dependencies:

- [@fontsource/material-icons](https://fontsource.org/docs/getting-started/material-icons) contains the icons used.
- [@fontsource/roboto](https://fontsource.org/fonts/roboto) integrate and serve the Roboto font.
- [awilix](https://github.com/jeffijoe/awilix) dependency injection container.
- [classnames](https://github.com/JedWatson/classnames#readme) a simple helper to generate class strings.
- [uuid](https://github.com/uuidjs/uuid#readme) a package used to generate uuids to use in the domain entities.
- [zod](https://zod.dev/) Schema declaration and validation. Used to ensure that the documents sent by the server and the newly created documents adhere to the entity schema.
- [zod-validation-error](https://github.com/causaly/zod-validation-error) used to easily generate validation errors to use in the new document form.

## Development dependencies

To ease the development, this project includes the following `devDependencies`:

- [@commitlint](https://commitlint.js.org/) ensure the commit messages adhere to the conventional commits syntax.
- [eslint](https://eslint.org/) ensure that the code follows the conventions. Check the `eslint.config.js`to see them.
- [@faker-js/faker](https://fakerjs.dev/) generate fake data for the tests.
- [vitest](https://vitest.dev/) test runner
- [vite](https://vite.dev/) bundler
- [husky](https://typicode.github.io/husky/) run tasks on git hooks, like commiting, pushing, etc.
- [msw](https://mswjs.io/) Mock Service Worker mock the API server while running tests.
