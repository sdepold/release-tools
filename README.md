# release-tools [![Build Status](https://travis-ci.org/sdepold/release-tools.svg?branch=master)](https://travis-ci.org/sdepold/release-tools)
A tiny collection of release helpers.

## Executables
The lib ships executables which are using the exported functions to bump and release node packages.

### npm_bump
Bump the package to a specific version without publishing it.

Usage:

```
npm_bump 1.2.3
```

### npm_release
Bump and release a new version of your package.

Usage:

```
npm_release 1.2.3
```

## Exported functions

### bump
This function is called by `npm_bump` and expects an object as first parameter:

```javascript
var releaseTools = require('release-tools');
releaseTools.bump({ version: '1.2.3' });
```

### release
This function is called by `npm_release` and expects an object as first parameter:

```javascript
releaseTools.release({ version: '1.2.3' });
```

## License
MIT
