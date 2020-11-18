var createError = require('http-errors');
var express = require('express');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://username:password@localhost:5432/database');
var app = express();


const session = require("express-session");
app.use(session({
  secret: "secret",
  resave: false,

        // Save empty value if there is no vaue which we do not want to do
        //save session details if no value is placed in session which would be false
        saveUninitialized: false
})
);
var path = require('path');
var { Pool} = require('pg');
const bodyParser = require('body-parser'); //for search in courses page
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


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

//Search
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());



module.exports = app;
