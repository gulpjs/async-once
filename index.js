'use strict';

var Queue = require('basic-queue');
var wrappy = require('wrappy');

var slice = Array.prototype.slice;

function asyncOnce(fn) {
  // Our state
  var _err;
  var _result;
  var _called = false;

  function worker(work, done) {
    var ctx = work.ctx;
    var initial = work.initial;
    var cb = work.cb;

    function updateState(err, result) {
      _err = err;
      _result = result;
      _called = true;
      cb(_err, _result);
      done();
    }

    if (_called) {
      cb(_err, _result);
      done();
    } else {
      fn.apply(ctx, initial.concat(updateState));
    }
  }

  var _queue = new Queue(worker, 1);

  return function() {
    var args = slice.call(arguments, 0);
    var work = {
      ctx: this,
      initial: args.slice(0, -1),
      cb: args.slice(-1)[0],
    };

    if (typeof work.cb !== 'function') {
      throw new Error('async-once only works with node-style async functions');
    }

    _queue.add(work);
  };
}

module.exports = wrappy(asyncOnce);
