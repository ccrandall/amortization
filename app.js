var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var expressValidator = require('express-validator');

var app = express();

var indexRouter = require('./routes/index');
var calcRouter = require('./routes/calculate');

app.set('views', 'views');
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(expressValidator());
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/', indexRouter);
app.use('/calculate', calcRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
app.listen(8000, function() {
  console.log("Listening on port 8000.");
});
*/

module.exports = app;