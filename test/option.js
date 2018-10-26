var json   = require('../');
var gulp   = require('gulp');

it('should pass-through second argument to js-beautify', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    version: '2.0.0',
    description: 'this is test',
    array: [
      '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890',
    ],
    nested: {
      version: '2.0.1',
      description: 'this is test for nested',
    },
  },
  {
    indent_size: 3,
    indent_char: '\t',
    brace_style: 'expand',
    preserve_newlines: false,
    wrap_line_length: 80,
  }));

  stream.on('data', function(file) {
    var expected =
      '{\n' +
      '\t\t\t"name": "test object",\n' +
      '\t\t\t"version": "2.0.0",\n' +
      '\t\t\t"nested":\n' +
      '\t\t\t{\n' +
      '\t\t\t\t\t\t"name": "nested object",\n' +
      '\t\t\t\t\t\t"version": "2.0.1",\n' +
      '\t\t\t\t\t\t"description": "this is test for nested"\n' +
      '\t\t\t},\n' +
      '\t\t\t"description": "this is test",\n' +
      '\t\t\t"array": ["1234567890", "1234567890", "1234567890", "1234567890",\n' +
      '\t\t\t\t\t\t"1234567890", "1234567890", "1234567890", "1234567890"\n' +
      '\t\t\t]\n' +
      '}';

    file.contents.toString().should.eql(expected);
    done();
  });
});


it('should keep indentation', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    version: '2.0.0',
    description: 'this is test',
    array: [
      '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890',
    ],
    nested: {
      version: '2.0.1',
      description: 'this is test for nested',
    },
  },
  {
    brace_style: 'expand',
    preserve_newlines: false,
    wrap_line_length: 80,
  }));

  stream.on('data', function(file) {
    var expected =
      '{\n' +
      '  "name": "test object",\n' +
      '  "version": "2.0.0",\n' +
      '  "nested":\n' +
      '  {\n' +
      '    "name": "nested object",\n' +
      '    "version": "2.0.1",\n' +
      '    "description": "this is test for nested"\n' +
      '  },\n' +
      '  "description": "this is test",\n' +
      '  "array": ["1234567890", "1234567890", "1234567890", "1234567890",\n' +
      '    "1234567890", "1234567890", "1234567890", "1234567890"\n' +
      '  ]\n' +
      '}';

    file.contents.toString().should.eql(expected);
    done();
  });
});

it('should bypass beautification when property is set', function(done) {

  var stream = gulp.src('test/test.json').pipe(json({
    version: '2.0.0',
    description: 'this is test',
    array: [
      '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890', '1234567890',
    ],
    nested: {
      version: '2.0.1',
      description: 'this is test for nested',
    },
  },
  {
    beautify: false,
  }));

  stream.on('data', function(file) {
    var expected = '{"name":"test object","version":"2.0.0","nested":{"name":"nested object","version":"2.0.1","description":"this is test for nested"},"description":"this is test","array":["1234567890","1234567890","1234567890","1234567890","1234567890","1234567890","1234567890","1234567890"]}';
    file.contents.toString().should.eql(expected);
    done();
  });
});
