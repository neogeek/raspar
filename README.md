# raspar

> A simple to use Promise-based web scraper with local caching.

## Usage

```javascript
const raspar = require('raspar');

raspar.get('http://www.google.com/humans.txt').then((content) => {

    console.log(content.body);

});
```

```javascript
const raspar = require('raspar');

raspar.get(['http://www.google.com/humans.txt']).then((contents) => {

    console.log(contents[0].body);

});
```

## Documentation

View full documentation [here](DOCUMENTATION.md).
