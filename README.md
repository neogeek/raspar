# raspar

> A simple to use Promise-based web scraper with local caching.

## Usage

```javascript
const raspar = require('raspar');

raspar.get('http://www.google.com/humans.txt').then((content) => {

    console.log(content);

});
```

```javascript
const raspar = require('raspar');

raspar.get(['http://www.google.com/humans.txt']).then((contents) => {

    console.log(contents[0]);

});
```
