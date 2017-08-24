# [raspar](https://github.com/neogeek/raspar) *1.1.2*

> A simple to use Promise-based web scraper with local caching.


### lib/raspar.js


#### requestFromUrl(url[, options])  *private method*

Request URL from remote resource.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  | A URL string. | &nbsp; |
| options | `Object`  | Options object. | *Optional* |
| options.cacheDirectory | `Boolean`  | Directory to store cache. Defaults to `temp/cache/`. | *Optional* |
| options.cacheMemory | `Boolean`  | Store cache in memory instead of local files. Defaults to `false`. | *Optional* |
| options.requestOptions | `Object`  | Custom request options object. | *Optional* |
| options.ttl | `Boolean`  | TTL (Time to live) in seconds for local/memory based cache. Default: 1800 | *Optional* |




##### Examples

```javascript
raspar.requestFromUrl('http://www.google.com/humans.txt').then(res => {});
```


##### Returns


- `Object`  Promise



#### formatCache([res])  *private method*

Parses local cache and adds cached property to the returned result.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| res | `Object`  | Stored cache response. | *Optional* |




##### Examples

```javascript
raspar.formatCache({}).then(res => { console.log(res.cached); });
```


##### Returns


- `Object`  Modified object with new cached property.



#### requestFromCache(url[, options])  *private method*

Requests a URL from cache.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  | A URL string. | &nbsp; |
| options | `Object`  | Options object. | *Optional* |
| options.cacheDirectory | `Boolean`  | Directory to store cache. Defaults to `temp/cache/`. | *Optional* |
| options.cacheMemory | `Boolean`  | Store cache in memory instead of local files. Defaults to `false`. | *Optional* |
| options.requestOptions | `Object`  | Custom request options object. | *Optional* |
| options.ttl | `Boolean`  | TTL (Time to live) in seconds for local/memory based cache. Default: 1800 | *Optional* |




##### Examples

```javascript
raspar.requestFromCache('http://www.google.com/humans.txt').then(res => {});
```


##### Returns


- `Object`  Promise



#### requestFromUrlorCache(url[, options])  *private method*

Requests a URL from either local cache or remote resource.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  | A URL string. | &nbsp; |
| options | `Object`  | Options object. | *Optional* |
| options.cacheDirectory | `Boolean`  | Directory to store cache. Defaults to `temp/cache/`. | *Optional* |
| options.cacheMemory | `Boolean`  | Store cache in memory instead of local files. Defaults to `false`. | *Optional* |
| options.requestOptions | `Object`  | Custom request options object. | *Optional* |
| options.ttl | `Boolean`  | TTL (Time to live) in seconds for local/memory based cache. Default: 1800 | *Optional* |




##### Examples

```javascript
raspar.requestFromUrlorCache('http://www.google.com/humans.txt').then(res => {});
```


##### Returns


- `Object`  Promise



#### fetch(url[, options]) 

Requests a URL or an array of URLs.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String` `Array`  | Either a URL string or an array of URLs. | &nbsp; |
| options | `Object`  | Options object. | *Optional* |
| options.cacheDirectory | `Boolean`  | Directory to store cache. Defaults to `temp/cache/`. | *Optional* |
| options.cacheMemory | `Boolean`  | Store cache in memory instead of local files. Defaults to `false`. | *Optional* |
| options.requestOptions | `Object`  | Custom request options object. | *Optional* |
| options.ttl | `Boolean`  | TTL (Time to live) in seconds for local/memory based cache. Default: 1800 | *Optional* |




##### Examples

```javascript
raspar.fetch('http://www.google.com/humans.txt').then(res => {});
```
```javascript
raspar.fetch(['http://www.google.com/humans.txt']).then(res => {});
```


##### Returns


- `Object`  Promise




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
