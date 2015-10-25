'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var once = require('../');

lab.experiment('async-once', function() {

  lab.test('calls once', function(done) {
    var count = 0;

    var fn = once(function(cb) {
      count++;
      cb(null, count);
    });

    fn(function(err, result) {
      code.expect(count).to.equal(1);
      code.expect(result).to.equal(1);
    });

    fn(function(err, result) {
      code.expect(count).to.equal(1);
      code.expect(result).to.equal(1);
      done(err);
    });
  });

  lab.test('will queue multiple async runs', function(done) {
    var count = 0;

    var fn = once(function(cb) {
      count++;
      process.nextTick(function() {
        cb(null, count);
      });
    });

    fn(function(err, result) {
      code.expect(count).to.equal(1);
      code.expect(result).to.equal(1);
    });

    fn(function(err, result) {
      code.expect(count).to.equal(1);
      code.expect(result).to.equal(1);
      done(err);
    });
  });

  lab.test('throws on non-node-style async function', function(done) {
    var fn = once(function() {});

    code.expect(fn.bind(null, 1234)).to.throw();
    done();
  });

  lab.test('passes extra args to the wrapped fn', function(done) {
    var fn = once(function(fwd, cb) {
      code.expect(fwd).to.equal(1);
      cb(null, fwd);
    });

    fn(1, function(err, result) {
      code.expect(result).to.equal(1);
    });

    fn(2, function(err, result) {
      code.expect(result).to.equal(1);
      done();
    });
  });

  lab.test('passes error from wrapped fn', function(done) {
    var error = new Error('boom');

    var fn = once(function(cb) {
      cb(error);
    });

    fn(function(err) {
      code.expect(err).to.equal(error);
    });

    fn(function(err) {
      code.expect(err).to.equal(error);
      done();
    });
  });
});
