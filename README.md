## Jovellanos

Asyncronous task engine written in Typescript.

![Build status](https://travis-ci.com/notaphplover/jovellanos.svg?branch=master)

## First steps

The setup of this project is simple:

1. Install the npm dependencies of the project

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

## Running tests

Tests can be run using the run task defined in the gulpfile of the project:

```
node ./node_modules/gulp/bin/gulp.js test
```

Once the tests are run, a coverage report will be generate in the coverage folder of the project.

