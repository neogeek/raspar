# raspar

> A simple to use Promise-based web scraper with local caching.

[![Build Status](https://travis-ci.org/neogeek/raspar.svg?branch=master)](https://travis-ci.org/neogeek/raspar)
[![codecov](https://img.shields.io/codecov/c/github/neogeek/raspar/master.svg)](https://codecov.io/gh/neogeek/raspar)
[![Dependency Status](https://david-dm.org/neogeek/raspar.svg)](https://david-dm.org/neogeek/raspar)
[![Known Vulnerabilities](https://snyk.io/test/npm/raspar/badge.svg)](https://snyk.io/test/npm/raspar)
[![bitHound Overall Score](https://www.bithound.io/github/neogeek/raspar/badges/score.svg)](https://www.bithound.io/github/neogeek/raspar)
[![NPM Version](http://img.shields.io/npm/v/raspar.svg?style=flat)](https://www.npmjs.org/package/raspar)
[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/neogeek/raspar)

## Usage

```javascript
const raspar = require('raspar');

raspar.fetch('http://www.google.com/humans.txt').then((res) => {

    console.log(res.body);

});
```

```javascript
const raspar = require('raspar');

raspar.fetch(['http://www.google.com/humans.txt']).then((res) => {

    console.log(res[0].body);

});
```

### Options

```javascript
const raspar = require('raspar');

const options = {
    'cacheDirectory': 'temp/cache/',
    'cacheMemory': false,
    'requestOptions': {
        'headers': {
            'User-Agent': 'request'
        },
        'method': 'POST'
    },
    'ttl': 1800
};

raspar.fetch('http://www.google.com/humans.txt', options).then((res) => { });
```

| Name | Description | Default Value |
| ---- | ----------- | ------------- |
| cacheDirectory | Directory to store cache. | `temp/cache/` |
| cacheMemory | Store cache in memory instead of local files. | `false` |
| ttl | TTL (Time to live) in seconds for local/memory based cache. | `1800` |

## Documentation

View full documentation [here](https://doxdox.org/neogeek/raspar).
