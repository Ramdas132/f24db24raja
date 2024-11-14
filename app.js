require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

const resourceRouter=require('./routes/resource');
var department = require("./models/department");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var departmentRouter = require('./routes/department');
var gridRouter = require('./routes/grid');
var randomRouter = require('./routes/pick');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/department',departmentRouter);
app.use('/grid',gridRouter);
app.use('/pick',randomRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/models/department',department)
app.use('/resource', resourceRouter);

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

async function recreateDB(){
 // Delete everything
 await department.deleteMany();
 let instance1 = new department({departmentName:"CSE", size:'Large',budget:10000});
 let instance2 = new department({departmentName:"ECE", size:'Medium',budget:50000});
 let instance3 = new department({departmentName:"MECH", size:'Small',budget:5000});
 instance1.save().then(doc=>{
 console.log("First department saved")}
 ).catch(err=>{
 console.error(err)
 });
 instance2.save().then(doc=>{
  console.log("Second department saved")}
  ).catch(err=>{
  console.error(err)
  });
  instance3.save().then(doc=>{
    console.log("Third department saved")}
    ).catch(err=>{
    console.error(err)
    });
}
let reseed = true;
if (reseed) {recreateDB();}


module.exports = app;
