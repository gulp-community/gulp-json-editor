var through     = require('through2');
var PluginError = require('gulp-util').PluginError;

module.exports = function (editor) {

  if (!editor) throw new PluginError('gulp-json-editor', 'missing "editor function" option for gulp-json-editor');    
  if (typeof editor !== 'function') throw new PluginError('gulp-json-editor', '"editor function" option must be Function');    

  return through.obj(function (file) {

    if (file.isNull()) return;
    if (file.isStream()) return this.emit('error', new PluginError('gulp-json-editor',  'Streaming not supported'));

    try {
      file.contents = new Buffer(JSON.stringify(editor(JSON.parse(file.contents.toString('utf8')))));
    }
    catch (err) {
      this.emit('error', new PluginError('gulp-json-editor', err));
    }
    this.push(file);

  });

};
