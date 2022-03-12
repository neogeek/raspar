# [raspar](https://github.com/neogeek/raspar)

> A simple to use Promise-based web scraper with local caching.

## fetch(urls, options)

Request content from URL or array of URLs.

### Parameters

| Name                   | Types         | Description                                         |
| ---------------------- | ------------- | --------------------------------------------------- |
| urls                   | String, Array | A URL or an array of URL strings.                   |
| options                | Object        | Options object.                                     |
| options.cacheDirectory | String        | Directory to store cache. Default is `temp/cache/`. |
| options.requestOptions | Object        | Custom request options object. Default is `{}`.     |
| options.ttl            | Number        | TTL (Time to live) in seconds. Default is 1800      |

### Returns

Object
Promise

## fetchFromUrl(url, options)

Request content from URL.

### Parameters

| Name                   | Types  | Description                                         |
| ---------------------- | ------ | --------------------------------------------------- |
| url                    | String | A URL string.                                       |
| options                | Object | Options object.                                     |
| options.cacheDirectory | String | Directory to store cache. Default is `temp/cache/`. |
| options.requestOptions | Object | Custom request options object. Default is `{}`.     |
| options.ttl            | Number | TTL (Time to live) in seconds. Default is 1800      |

### Returns

Object
Promise

## checkCacheExpiry(path, ttl)

Check to see if file has expired based on the given TTL.

### Parameters

| Name | Types  | Description                    |
| ---- | ------ | ------------------------------ |
| path | String | File path to check.            |
| ttl  | Number | TTL (Time to live) in seconds. |

### Returns

Object
Promise

## generateUUID(content)

Generate unique identifier from string.

### Parameters

| Name    | Types  | Description                           |
| ------- | ------ | ------------------------------------- |
| content | String | String to generate unique identifier. |

### Returns

String


## readCache(path, ttl)

Read cache from file only if cache hasn't expired.

### Parameters

| Name | Types  | Description                    |
| ---- | ------ | ------------------------------ |
| path | String | File path to read cache.       |
| ttl  | Number | TTL (Time to live) in seconds. |

### Returns

Object
Promise

## writeCache(path, content)

Write cache contents to file. Will create directories if they don't exist.

### Parameters

| Name    | Types  | Description               |
| ------- | ------ | ------------------------- |
| path    | String | File path to store cache. |
| content | String | Contents of cache.        |

### Returns

Object
Promise

Documentation generated with [doxdox](https://github.com/docsbydoxdox/doxdox)

Generated on Sat Mar 12 2022 00:40:27 GMT-0500 (Eastern Standard Time)
