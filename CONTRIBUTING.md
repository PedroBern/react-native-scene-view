# Contributing

## Project setup

Fork the repository, clone the fork to your local machine and install dependencies:

```sh
git clone https://github.com/<your_github_username>/MY_PACKAGE_NAME_HERE.git
cd MY_PACKAGE_NAME_HERE
yarn bootstrap
```

## Developing

While developing, you can run the example app to test your changes.

```sh
cd examples
expo start
```

Please follow the [angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint -- --fix
```

Remember to add tests for your change if possible.
