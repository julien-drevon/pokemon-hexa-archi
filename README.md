## Description

Hexagonal architecture with node
le but n'est pâs d'avoir un pokedex complet mais un exemple d'organisation pour une architecture hexa.
Il y a une implementation de controller avec et sans interactor.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

You can access to swagger by localhost:3000/api

## Test

```bash
# all tests
$ npm run test

#unit tests (core)
$ npm test:unit

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

you can run tests on docker by using script :

windows
```bash
testscript.ps1
```
linux
```bash
testscript.bash
```
you can run server on docker by using script :
windows
```bash
prodscript.ps1
```
linux
```bash
prodscript.bash
```