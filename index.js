/* jshint node: true */

var jsbeautify  = require('js-beautify').js_beautify;
var merge       = require('deepmerge');
var through     = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function (editor, jsbeautifyOptions) {

  /*
   create 'editBy' function from 'editor'
   */
  var editBy;
  if (typeof editor === 'function') {
    // edit JSON object by user specific function
    editBy = function(json) { return JSON.stringify(editor(json)); };
  }
  else if (typeof editor === 'object') {
    // edit JSON object by merging with user specific object
    editBy = function(json) { return JSON.stringify(merge(json, editor)); };
  }
  else if (typeof editor === 'undefined') {
    throw new PluginError('gulp-json-editor', 'missing "editor" option');
  }
  else {
    throw new PluginError('gulp-json-editor', '"editor" option must be a function or object');
  }

  /*
   js-beautify option
   */
  jsbeautifyOptions = jsbeautifyOptions || {};

  // always beautify output
  var beautify = true;

  // set default value for backword compatibility
  jsbeautifyOptions.indent_size = jsbeautifyOptions.indent_size || 2;
  jsbeautifyOptions.indent_char = jsbeautifyOptions.indent_char || ' ';
  jsbeautifyOptions.brace_style = jsbeautifyOptions.brace_style || 'collapse';

  /*
   create through object and return it
   */
  return through.obj(function (file, encoding, callback) {

    // ignore it
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    // stream is not supported
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-json-editor', 'Streaming is not supported'));
      return callback();
    }

    try {
      // edit JSON object and get it as string notation
      var json = editBy(JSON.parse(file.contents.toString('utf8')));

      // beautify JSON
      if (beautify) {
        json = jsbeautify(json, jsbeautifyOptions);
      }

      // write it to file
      file.contents = new Buffer(json);
    }
    catch (err) {
      this.emit('error', new PluginError('gulp-json-editor', err));
    }

    this.push(file);
    callback();

  });

};
