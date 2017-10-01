<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# async-once

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Guarantee a node-style async function is only executed once.

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

## API

### `once(fn)`

Takes a node-style async function (`fn`) to ensure it's only called once. The function should accept a callback as its last parameter which is called with `cb(err, result)`. Returns a function that can be called any number of times but will only execute once. Arguments passed to the returned function will be passed to the `fn`.

## License

MIT

[downloads-image]: http://img.shields.io/npm/dm/async-once.svg
[npm-url]: https://npmjs.com/package/async-once
[npm-image]: http://img.shields.io/npm/v/async-once.svg

[travis-url]: https://travis-ci.org/gulpjs/async-once
[travis-image]: http://img.shields.io/travis/gulpjs/async-once.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/async-once
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/async-once.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/async-once
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/async-once/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.png
