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

    //
    // test: modify property
    //
    it('should modify property of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        obj.version = '2.0.0';
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'name': 'test object',
          'version': '2.0.0'
        });
      });
      stream.on('end', done);
    });

    //
    // test: add property
    //
    it('should add property of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        obj.description = 'this is test';
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'name': 'test object',
          'version': '1.0.0',
          'description': 'this is test'
        });
      });
      stream.on('end', done);
    });

    //
    // test: remove property
    //
    it('should remove property of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        delete obj.name;
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'version': '1.0.0'
        });
        obj.should.not.have.property('name');
      });
      stream.on('end', done);
    });

    //
    // test: modify nested property
    //
    it('should modify nested property of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        obj.nested.version = '2.0.1';
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.nested.should.have.properties({
          'name': 'nested object',
          'version': '2.0.1'
        });
      });
      stream.on('end', done);
    });

    //
    // test: add nested property
    //
    it('should add nested property of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        obj.nested.description = 'this is test for nested';
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.nested.should.have.properties({
          'name': 'nested object',
          'version': '1.0.0',
          'description': 'this is test for nested'
        });
      });
      stream.on('end', done);
    });

    //
    // test: remove property
    //
    it('should remove nested property of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        delete obj.nested.name;
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.nested.should.have.properties({
          'version': '1.0.0'
        });
        obj.nested.should.not.have.property('name');
      });
      stream.on('end', done);
    });

    //
    // test: edit multiple properties at once
    //
    it('should multiple properties of JSON object', function(done) {
      var stream = gulp.src('test/test.json').pipe(json(function(obj) {
        obj.version = '2.0.0';
        obj.description = 'this is test';
        delete obj.name;
        obj.nested.version = '2.0.1';
        obj.nested.description = 'this is test for nested';
        delete obj.nested.name;
        return obj;
      }));
      stream.on('error', done);
      stream.on('data', function(file) {
        var obj = JSON.parse(file.contents);
        obj.should.have.properties({
          'version': '2.0.0',
          'description': 'this is test'
        });
        obj.should.not.have.property('name');
        obj.nested.should.have.properties({
          'version': '2.0.1',
          'description': 'this is test for nested'
        });
        obj.nested.should.not.have.property('name');
      });
      stream.on('end', done);
    });

  });
});
