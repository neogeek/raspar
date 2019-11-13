# raspar

> A simple to use Promise-based web scraper with local caching.

[![Build Status](https://travis-ci.org/neogeek/raspar.svg?branch=master)](https://travis-ci.org/neogeek/raspar)
[![NPM Version](http://img.shields.io/npm/v/raspar.svg?style=flat)](https://www.npmjs.org/package/raspar)

## Usage

```javascript
const {fetch} = require('raspar');

fetch('http://www.google.com/humans.txt').then(res => {

    console.log(res);

});
```

```javascript
const {fetch} = require('raspar');

fetch(['http://www.google.com/humans.txt']).then(res => {

    console.log(res[0]);

});
```

### Options

```javascript
const raspar = require('raspar');

const options = {
    'cacheDirectory': 'temp/cache/',
    'requestOptions': {
        'headers': {
            'User-Agent': 'request'
        },
        'method': 'POST'
    },
    'ttl': 1800
};

raspar.fetch('http://www.google.com/humans.txt', options).then(res => { });
```

| Name | Description | Default Value |
| ---- | ----------- | ------------- |
| cacheDirectory | Directory to store cache. | `temp/cache/` |
| requestOptions | Request options object. [Read more github.com/request/request](https://github.com/request/request#requestoptions-callback) | `{}` |
| ttl | TTL (Time to live) in seconds. | `1800` |
