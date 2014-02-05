# gulp-json-editor

gulp-json-editor is a [gulp](https://github.com/wearefractal/gulp) plugin to edit JSON object.

## Usage
```javascript
var jeditor = require("gulp-json-editor");

gulp.src("./manifest.json")
  .pipe(jeditor(function(obj) {
    obj.version = "1.2.3";
    return obj;
  }))
  .pipe(gulp.dest("./dest"));
```

#### Note
In case of such situation, all of comment and white space in source file isn't kept in destination file.

## API
### json(editorFunction)
#### editorFunction
The `editorFunction` must have the following signature: `function (obj) {}`, and must return JSON object.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)