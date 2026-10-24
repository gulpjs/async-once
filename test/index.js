"use strict";

var assert = require("node:assert");
var { describe, it } = require("node:test");

var once = require("../");

describe("async-once", function () {
  it("calls once", function (t, done) {
    var count = 0;

    var fn = once(function (cb) {
      count++;
      cb(null, count);
    });

    fn(function (err, result) {
      assert.strictEqual(count, 1);
      assert.strictEqual(result, 1);
    });

    fn(function (err, result) {
      assert.strictEqual(count, 1);
      assert.strictEqual(result, 1);
      done(err);
    });
  });

  it("will queue multiple async runs", function (t, done) {
    var count = 0;

    var fn = once(function (cb) {
      count++;
      process.nextTick(function () {
        cb(null, count);
      });
    });

    fn(function (err, result) {
      assert.strictEqual(count, 1);
      assert.strictEqual(result, 1);
    });

    fn(function (err, result) {
      assert.strictEqual(count, 1);
      assert.strictEqual(result, 1);
      done(err);
    });
  });

  it("throws on non-node-style async function", function (t, done) {
    var fn = once(function () {});
    assert.throws(fn.bind(null, 1234));
    done();
  });

  it("passes extra args to the wrapped fn", function (t, done) {
    var fn = once(function (fwd, cb) {
      assert.strictEqual(fwd, 1);
      cb(null, fwd);
    });

    fn(1, function (err, result) {
      assert.strictEqual(result, 1);
    });

    fn(2, function (err, result) {
      assert.strictEqual(result, 1);
      done();
    });
  });

  it("passes error from wrapped fn", function (t, done) {
    var error = new Error("boom");

    var fn = once(function (cb) {
      cb(error);
    });

    fn(function (err) {
      assert.strictEqual(err, error);
    });

    fn(function (err) {
      assert.strictEqual(err, error);
      done();
    });
  });
});
