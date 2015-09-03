# raspar

> A simple to use Promise-based web scraper with local caching.

## Usage

```javascript
var raspar = require('raspar');

raspar.get('http://www.google.com/humans.txt').done(function (content) {

    console.log(content);

});
```

```javascript
var raspar = require('raspar');

raspar.get(['http://www.google.com/humans.txt']).done(function (contents) {

    console.log(contents[0]);

});
```
