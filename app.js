var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var { Mongoose } = require('./untils/config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// var dbOptions={
// 	cookieSecret: 'test',
// 	dbName: 'testDb',
// 	url:'mongodb://localhost/testDb'
// };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('aneiffr'));
app.use(cookieParser());
app.use(session({
	secret: 'aneiffr',
	name: 'sessionId',
	resave: true,
	rolling: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000*60*60,
		secure: false
	},
	// store: new mongoStore({
	// 	db: dbOptions.dbName,
	// 	url: 'mongodb://localhost/travelserver'
	// })
}));
app.all("*",(req, res, next)=>{
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api3/users', usersRouter);

Mongoose.connect();

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

module.exports = app;
