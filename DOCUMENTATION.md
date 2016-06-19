# Documentation


## raspar.js


### requestFromUrl(url[, options])  *private method*

Request URL from remote resource.




#### Parameters

- **url** `String`   A URL string.
- **options** `Object`  *Optional* Options object.
- **options.cacheDirectory** `Boolean`  *Optional* Directory to store cache. Defaults to `temp/cache/`.
- **options.cacheMemory** `Boolean`  *Optional* Store cache in memory instead of local files. Defaults to `false`.
- **options.ttl** `Boolean`  *Optional* TTL (Time to live) for local/memory based cache.




#### Examples

```javascript
raspar.requestFromUrl('http://www.google.com/humans.txt').then((res) => {});
```


#### Returns


- `Object`   Promise



### formatCache([res])  *private method*

Parses local cache and adds cached property to the returned result.




#### Parameters

- **res** `Object`  *Optional* Stored cache response.




#### Examples

```javascript
raspar.formatCache({}).then((res) => { console.log(res.cached); });
```


#### Returns


- `Object`   Modified object with new cached property.



### requestFromCache(url[, options])  *private method*

Requests a URL from cache.




#### Parameters

- **url** `String`   A URL string.
- **options** `Object`  *Optional* Options object.
- **options.cacheDirectory** `Boolean`  *Optional* Directory to store cache. Defaults to `temp/cache/`.
- **options.cacheMemory** `Boolean`  *Optional* Store cache in memory instead of local files. Defaults to `false`.
- **options.ttl** `Boolean`  *Optional* TTL (Time to live) for local/memory based cache.




#### Examples

```javascript
raspar.requestFromCache('http://www.google.com/humans.txt').then((res) => {});
```


#### Returns


- `Object`   Promise



### requestFromUrlorCache(url[, options])  *private method*

Requests a URL from either local cache or remote resource.




#### Parameters

- **url** `String`   A URL string.
- **options** `Object`  *Optional* Options object.
- **options.cacheDirectory** `Boolean`  *Optional* Directory to store cache. Defaults to `temp/cache/`.
- **options.cacheMemory** `Boolean`  *Optional* Store cache in memory instead of local files. Defaults to `false`.
- **options.ttl** `Boolean`  *Optional* TTL (Time to live) for local/memory based cache.




#### Examples

```javascript
raspar.requestFromUrlorCache('http://www.google.com/humans.txt').then((res) => {});
```


#### Returns


- `Object`   Promise



### get(url[, options]) 

Requests a URL or an array of URLs.




#### Parameters

- **url** `String` `Array`   Either a URL string or an array of URLs.
- **options** `Object`  *Optional* Options object.
- **options.cacheDirectory** `Boolean`  *Optional* Directory to store cache. Defaults to `temp/cache/`.
- **options.cacheMemory** `Boolean`  *Optional* Store cache in memory instead of local files. Defaults to `false`.
- **options.ttl** `Boolean`  *Optional* TTL (Time to live) for local/memory based cache.




#### Examples

```javascript
raspar.get('http://www.google.com/humans.txt').then((res) => {});
```
```javascript
raspar.get(['http://www.google.com/humans.txt']).then((res) => {});
```


#### Returns


- `Object`   Promise




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
