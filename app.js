require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

const resourceRouter = require('./routes/resource');
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
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/department', departmentRouter);
app.use('/grid', gridRouter);
app.use('/pick', randomRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/models/department', department)
app.use('/resource', resourceRouter);
// passport config
// Use the existing connection
// The Account model 
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


async function recreateDB() {
  try {
    // Delete all departments
    await department.deleteMany();
    console.log("Deleted existing departments");

    // Create new department instances
    let instance1 = new department({ departmentName: "CSE", size: 'Large', budget: 10000 });
    let instance2 = new department({ departmentName: "ECE", size: 'Medium', budget: 50000 });
    let instance3 = new department({ departmentName: "MECH", size: 'Small', budget: 5000 });

    // Save the instances and log success or failure
    await instance1.save();
    console.log("First department saved");
    await instance2.save();
    console.log("Second department saved");
    await instance3.save();
    console.log("Third department saved");

  } catch (err) {
    console.error("Error during database seeding:", err);
  }
}

let reseed = true;
if (reseed) { recreateDB(); }


module.exports = app;
