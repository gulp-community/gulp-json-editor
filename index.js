/* jshint node: true */

var through     = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function (editor) {

  // check options
  if (!editor)
    throw new PluginError('gulp-json-editor', 'missing "editor function" option');    
  if (typeof editor !== 'function')
    throw new PluginError('gulp-json-editor', '"editor function" option must be function');    

  return through.obj(function (file, encoding, callback) {

    // ignore it
    if (file.isNull()) {
      return callback();
    }

    // stream is not supported
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-json-editor', 'Streaming is not supported'));
      return callback();
    }

    // edit JSON object
    try {
      file.contents = new Buffer(JSON.stringify(editor(JSON.parse(file.contents.toString('utf8')))));
    }
    catch (err) {
      this.emit('error', new PluginError('gulp-json-editor', err));
    }
    this.push(file);
    callback();

  });

};
