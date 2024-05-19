
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
$ yarn migrate:latest
```

## Running the app

```bash

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker

```bash
# create postgres container with dev and test DB
$ yarn compose:up

# build whole app and run it in docker container with migration
$ yarn compose:prod

```

## Test

```bash
# unit tests
$ yarn run test


```

## DB

```bash
# create postgres container with dev and test DB
$ yarn compose:up

# build whole app and run it in docker container with migration
$ yarn compose:prod

```