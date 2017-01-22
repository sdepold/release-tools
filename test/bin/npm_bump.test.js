/* global describe, it, beforeEach, afterEach */
'use strict';

// 3rd party modules
var expect = require('expect.js');
var sinon = require('sinon');

var helper = require('./helper');
var bumpAndGetVersion = helper.bumpAndGetVersion;
var callBump = helper.callBump;

describe('npm_bump', function () {
  describe('call without args', function () {
    it('renders the help', function () {
      return callBump().then(function () {
        // We should not reach this code...
        expect(1).to.equal(2);
      }, function (e) {
        expect(e).to.contain('--bugfix, -b')
      });
    });
  });

  describe('call with bugfix option', function () {
    it('bumps the third fragment', function () {
      return bumpAndGetVersion('--bugfix').then(function (version) {
        expect(version).to.equal('0.0.1');
      });
    });
  });

  describe('call with minor option', function () {
    it('bumps the second fragment', function () {
      return bumpAndGetVersion('--minor').then(function (version) {
        expect(version).to.equal('0.1.0');
      });
    });
  });

  describe('call with major option', function () {
    it('bumps the first fragment', function () {
      return bumpAndGetVersion('--major').then(function (version) {
        expect(version).to.equal('1.0.0');
      });
    });
  });
});
