## Jovellanos

Asyncronous task engine written in Typescript.

[![Build status](https://travis-ci.com/notaphplover/jovellanos.svg?branch=master)](https://travis-ci.com/notaphplover/jovellanos.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/notaphplover/jovellanos/badge.svg?branch=master)](https://coveralls.io/github/notaphplover/jovellanos?branch=master)
[![npm version](https://badge.fury.io/js/jovellanos.svg)](https://badge.fury.io/js/jovellanos)

## Installing the library

You can install the library using npm:

```
npm i jovellanos
```

## First steps

If you are interested in the project, the setup is really simple:

1. Clone the project

```
git clone https://github.com/notaphplover/jovellanos.git
```

2. Install the npm dependencies of this project

```
npm i
```

Thats all!

## Build process

This library uses Gulp to perform the build task.

This task can be performed calling the task 'build' defined in the gulpfile.js of the project:

```
node ./node_modules/gulp/bin/gulp.js build
```

## Documentation build process.

The API documentation is generated using [Typedoc](https://github.com/TypeStrong/typedoc).

```
node ./node_modules/gulp/bin/gulp.js typedoc
```

The docs will be generated at the **docs/api** folder.

## Running tests

Tests can be run using the run task defined in the gulpfile of the project:

```
node ./node_modules/gulp/bin/gulp.js test
```

Once the tests are run, a coverage report will be generate in the coverage folder of the project.

