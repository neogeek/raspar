# raspar

> A simple to use Promise-based web scraper with local caching.

## Usage

```javascript
var raspar = require('raspar');

raspar.get('http://www.google.com/humans.txt').then(function (content) {

    console.log(content);

});
```

```javascript
var raspar = require('raspar');

raspar.get(['http://www.google.com/humans.txt']).then(function (contents) {

    console.log(contents[0]);

});
```
