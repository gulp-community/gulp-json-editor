# gulp-json-editor

gulp-json-editor is a [gulp](https://github.com/wearefractal/gulp) plugin to edit JSON object.

## Usage
```javascript
var jeditor = require("gulp-json-editor");

gulp.src("./manifest.json")
  .pipe(jeditor(function(json) {
    // json is normal JSON object. You can modify / add / remove any properties.
    json.version = "1.2.3";
    // must return JSON object.
    return json;
  }))
  .pipe(gulp.dest("./dest"));
```

### Note
In case of such above situation, all of comment and whitespace in source file isn't kept in destination file.

## API
### jeditor(editorFunction, [beautify])
#### editorFunction
The `editorFunction` must have the following signature: `function (json) {}`, and must return JSON object.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)