# async-once

[![Travis Build Status](https://img.shields.io/travis/phated/async-once/master.svg?label=travis&style=flat-square)](https://travis-ci.org/phated/async-once)

Guarantee a node-style async function is only executed once

## Usage

```js
var once = require('async-once');

var count = 0;

var myAsyncFunc = once(function(cb){
  count++;
  cb(null, count);
});

myAsyncFunc(function(err, result){
  assert(result === 1);
});

myAsyncFunc(function(err, result){
  assert(result === 1);
});

assert(count === 1);
```

## License

MIT
