if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
const express = require('express');
const createHttpError = require('http-errors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
require('./lib/passport-auth')(passport);

//import and create the mongoDB connection
const dbConnect = require('./db/db-connections');
const db = dbConnect.connectToDB(process.env.DB_URL, {useNewUrlParser: true});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('connected'));
//impor routes
const homeRoute = require('./routes/home');
const userRoute = require('./routes/users');

const PORT = process.env.PORT || 4545

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 24 * 3600,
    touchAfter: 12 * 3600
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoute);
app.use('/users', userRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createHttpError(404, 'Not Found'));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error', {error: err});
  });

  app.listen(PORT, () => console.log('server started on port ' + PORT));