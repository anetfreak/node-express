//Module Dependencies
var express = require('express'),
  stylus = require('stylus'),
  nib = require('nib')

//Initializing Express
var app = express()

function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib())
}

//Configuring Logger, Views and Jade
var logger = require('morgan')
app.use(logger('combined'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware(
  { src: __dirname + '/public',
    compile: compile
}
))
app.use(express.static(__dirname + '/public'))

//Handle Request
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})
app.listen(3000)
