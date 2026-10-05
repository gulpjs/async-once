<p align="center">
  <a href="https://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# async-once

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Guarantee a node-style async function is only executed once.

## Usage

```js
var once = require('async-once');

var count = 0;

var myAsyncFunc = once(function (cb) {
  count++;
  cb(null, count);
});

myAsyncFunc(function (err, result) {
  assert(result === 1);
});

myAsyncFunc(function (err, result) {
  assert(result === 1);
});

assert(count === 1);
```

## API

### `once(fn)`

Takes a node-style async function (`fn`) to ensure it's only called once. The function should accept a callback as its last parameter which is called with `cb(err, result)`. Returns a function that can be called any number of times but will only execute once. Arguments passed to the returned function will be passed to the `fn`.

## Strict No LLM / No AI Policy

No LLMs for issues.

No LLMs for patches / pull requests.

No LLMs for comments on the bug tracker, including translation.

English is encouraged, but not required. You are welcome to post in your native language and rely on others to have their own translation tools of choice to interpret your words.

## License

MIT

<!-- prettier-ignore-start -->
[downloads-image]: https://img.shields.io/npm/dm/async-once.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/async-once
[npm-image]: https://img.shields.io/npm/v/async-once.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/async-once/actions/workflows/dev.yml
[ci-image]: https://img.shields.io/github/actions/workflow/status/gulpjs/async-once/dev.yml?style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/async-once
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/async-once/main.svg?style=flat-square
<!-- prettier-ignore-end -->
