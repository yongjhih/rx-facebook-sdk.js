var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var RxFacebook = require('../index');

describe('rx-facebook', function() {
  it('should be defined', function() {
    expect(RxFacebook).to.be.a('function');
  });

  it('should be .Members defined', function() {
    expect(RxFacebook.Members).to.be.a('function');
  });

});

/* vim: set sw=2: */
