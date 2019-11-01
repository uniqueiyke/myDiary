let sslOptions;
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  const fs = require('fs');
  sslOptions = {
    key: fs.readFileSync("../cert1/server.key"),
    cert: fs.readFileSync("../cert1/server.cer")
  };
}
const https = require('https');
const express = require('express');
const createHttpError = require('http-errors');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const UserInfo = require('./models/user-info');
const UserModel = require('./lib/user-model-mapping');
require('./lib/passport-config/passport-local-auth')(passport);
require('./lib/passport-config/passport-google-auth')(passport);
require('./lib/passport-config/passport-facebook-auth')(passport);
require('./lib/passport-config/passport-twitter-auth')(passport);
require('./lib/passport-config/passport-serialize')(passport);


//import and create the mongoDB connection
const dbConnect = require('./db/db-connections');
const db = dbConnect.connectToDB(process.env.DB_URL, {useNewUrlParser: true});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', () => console.log('connected'));
//impor routes
const homeRoute = require('./routes/home');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

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
  unset: 'destroy',
  secure: true,
  store: new MongoStore({
    mongooseConnection: db,
    ttl: 24 * 3600 * 1000,
    touchAfter: 12 * 3600
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

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

  //https.createServer(sslOptions, app).listen(PORT, () => console.log('server  https://localhost:' + PORT));
app.listen(PORT, () => console.log('server started on port ' + PORT));