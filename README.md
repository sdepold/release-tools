# release-tools [![Build Status](https://travis-ci.org/sdepold/release-tools.svg?branch=master)](https://travis-ci.org/sdepold/release-tools)

A tiny collection of release helpers that will help you bumping and publishing your package without too much hassles.

The projects ships a bunch of source code that get's used by very thin CLI wrappers. This way it is possible to actually use the sources independently from the command line, which can be handy if you want to integrate the logic into your own work flow.

## Executables

Right now this project is very `npm` focussed but could in theory be used with every other dependency management tool as well.

### npm_bump

This executable is doing the following steps:

* It checks if your project contains a `CHANGELOG.md` file.
* If there is a changelog, it will check if the changelog contains the needle `## Upcoming` and replaces it with the new version and the current timestamp.
* If there is a changelog, it will commit the changes in changelog with the commit message `Add changes in version: v<version>`.
* It will now update run `npm version` which will set the version of your package.json to the new value, commit the change with the commit message `Bump to version: v<version>` and finally create a tag for the new version á la `v<version>`.
* It will now push your changes and your tags to the remote server (via git).

#### Usage

```
npm_bump 1.2.3
```

### npm_release

Thie executable is doing the following steps:

- Call `npm_bump`. See the above steps.
- Release the package to npm via `npm publish`.

#### Usage

```
npm_release 1.2.3
```

## Exported functions

### npm.bump
This function is called by `npm_bump` and expects an object as first parameter:

```javascript
var releaseTools = require('release-tools');
releaseTools.npm.bump({ version: '1.2.3' });
```

### npm.release
This function is called by `npm_release` and expects an object as first parameter:

```javascript
releaseTools.npm.release({ version: '1.2.3' });
```

## One word about changelogs

Many of my projects are (roughly) following the schema of [keepachangelog](http://keepachangelog.com/).

## License
MIT
