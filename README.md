# raspar

> A simple to use Promise-based web scraper with local caching.

[![Tests](https://github.com/neogeek/raspar/actions/workflows/test.workflow.yml/badge.svg)](https://github.com/neogeek/raspar/actions/workflows/test.workflow.yml)
[![NPM Version](http://img.shields.io/npm/v/raspar.svg?style=flat)](https://www.npmjs.org/package/raspar)
[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/)

## Usage

```javascript
const { fetch } = require('raspar');

fetch('http://www.google.com/humans.txt').then(content => console.log(content));
```

```javascript
const { fetch } = require('raspar');

fetch([
  'http://www.google.com/humans.txt',
  'http://www.google.com/robots.txt'
]).then(content => console.log(content[0]));
```

### Options

```javascript
const { fetch } = require('raspar');

const options = {
  cacheDirectory: 'temp/cache/',
  requestOptions: {
    headers: {
      'User-Agent': 'request'
    },
    method: 'POST'
  },
  ttl: 1800
};

fetch('http://www.google.com/humans.txt', options).then(content =>
  console.log(content)
);
```

| Name           | Description                                                                                                                     | Default Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| cacheDirectory | Directory to store cache.                                                                                                       | `temp/cache/` |
| requestOptions | Request options object. [Read more github.com/node-fetch/node-fetch](https://github.com/node-fetch/node-fetch/tree/2.x#options) | `{}`          |
| ttl            | TTL (Time to live) in seconds.                                                                                                  | `1800`        |
