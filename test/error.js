/* jshint node: true */
/* global describe, it */

var json   = require('../');
var gulp   = require("gulp");
require('should');
require('mocha');

describe('gulp-json-editor', function() {
  describe('#json()', function() {

    //
    // test: raise error when missing option
    //
    it('should raise error when missing option', function(done) {
      (function() {
        var stream = gulp.src('test/test.json').pipe(json());
        stream.on('error', done);
        stream.on('data', done);
      }).should.throw('missing "editor function" option');
      done();
    });

    //
    // test: raise error when invalid type of option
    //
    it('should raise error when invalid type of option', function(done) {
      (function() {
        var stream = gulp.src('test/test.json').pipe(json(100));
        stream.on('error', done);
        stream.on('data', done);
      }).should.throw('"editor function" option must be function');
      done();
    });

  });
});
