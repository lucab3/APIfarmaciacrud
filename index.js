
var createError = require('http-errors');
const express = require('express');
var path = require('path');
const app = express();
const bodyParser= require ('body-parser') //googlear 
var logger = require('morgan');


var apiRouter = require ('./Routes/Api.js');



var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Escuchando en el puerto: ' + port + '!');
});
app.use(logger('dev'));
app.use(express.json()); //googlear
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))

app.use ('/api',apiRouter);

app.use(function(req, res, next) {
    next(createError(404));
  });




module.exports = app;