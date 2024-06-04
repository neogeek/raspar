# raspar

> A simple to use Promise-based web scraper with local caching.

[![Tests](https://github.com/neogeek/raspar/actions/workflows/test.workflow.yml/badge.svg)](https://github.com/neogeek/raspar/actions/workflows/test.workflow.yml)
[![NPM Version](http://img.shields.io/npm/v/raspar.svg?style=flat)](https://www.npmjs.org/package/raspar)
[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/)

## Usage

```javascript
import { fetch } from 'raspar';

const contents = await fetch('http://www.google.com/humans.txt');

console.log(contents);
```

```javascript
import { fetch } from 'raspar';

const multipleFetches = await fetch([
  'http://www.google.com/humans.txt',
  'http://www.google.com/robots.txt'
]);

multipleFetches.map(contents => {
  console.log(contents);
});
```

### Options

```javascript
import { fetch } from 'raspar';

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

const contents = await fetch('http://www.google.com/humans.txt', options);

console.log(contents);
```

| Name           | Description                                                                                                                     | Default Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| cacheDirectory | Directory to store cache.                                                                                                       | `temp/cache/` |
| requestOptions | Request options object. [Read more github.com/node-fetch/node-fetch](https://github.com/node-fetch/node-fetch/tree/2.x#options) | `{}`          |
| ttl            | TTL (Time to live) in seconds.                                                                                                  | `1800`        |
