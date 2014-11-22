//Module Dependencies
var express = require('express'),
  stylus = require('stylus'),
  nib = require('nib');

var app = express();
function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib());
}

var logger = require('morgan');
app.use(logger);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
  { src: __dirname + '/public',
    compile: compile
}
));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.end('Wassup Yo!')
});
app.listen(8000);