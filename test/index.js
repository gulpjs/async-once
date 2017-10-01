'use strict';

var expect = require('expect');

var once = require('../');

describe('async-once', function() {

  it('calls once', function(done) {
    var count = 0;

    var fn = once(function(cb) {
      count++;
      cb(null, count);
    });

    fn(function(err, result) {
      expect(count).toEqual(1);
      expect(result).toEqual(1);
    });

    fn(function(err, result) {
      expect(count).toEqual(1);
      expect(result).toEqual(1);
      done(err);
    });
  });

  it('will queue multiple async runs', function(done) {
    var count = 0;

    var fn = once(function(cb) {
      count++;
      process.nextTick(function() {
        cb(null, count);
      });
    });

    fn(function(err, result) {
      expect(count).toEqual(1);
      expect(result).toEqual(1);
    });

    fn(function(err, result) {
      expect(count).toEqual(1);
      expect(result).toEqual(1);
      done(err);
    });
  });

  it('throws on non-node-style async function', function(done) {
    var fn = once(function() {});

    expect(fn.bind(null, 1234)).toThrow();
    done();
  });

  it('passes extra args to the wrapped fn', function(done) {
    var fn = once(function(fwd, cb) {
      expect(fwd).toEqual(1);
      cb(null, fwd);
    });

    fn(1, function(err, result) {
      expect(result).toEqual(1);
    });

    fn(2, function(err, result) {
      expect(result).toEqual(1);
      done();
    });
  });

  it('passes error from wrapped fn', function(done) {
    var error = new Error('boom');

    var fn = once(function(cb) {
      cb(error);
    });

    fn(function(err) {
      expect(err).toEqual(error);
    });

    fn(function(err) {
      expect(err).toEqual(error);
      done();
    });
  });
});
