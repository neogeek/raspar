# raspar

> A simple to use Promise-based web scraper with local caching.

## Usage

```javascript
const raspar = require('raspar');

raspar.get('http://www.google.com/humans.txt').then((res) => {

    console.log(res.body);

});
```

```javascript
const raspar = require('raspar');

raspar.get(['http://www.google.com/humans.txt']).then((res) => {

    console.log(res[0].body);

});
```

### Options

```javascript
const raspar = require('raspar');

raspar.get('http://www.google.com/humans.txt', options).then((res) => { });
```

| Name | Description | Default Value |
| ---- | ----------- | ------------- |
| cacheDirectory | Directory to store cache. | `temp/cache/` |
| cacheMemory | Store cache in memory instead of local files. | `false` |
| ttl | TTL (Time to live) for local/memory based cache. | `86400` |

## Documentation

View full documentation [here](DOCUMENTATION.md).
