const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const cookieCheck = require("./middlewares/cookieCheck");
const localsUserCheck = require('./middlewares/localsUserCheck');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
    
    app.use(session({
      secret : "clubx",
      resave: false,
      saveUninitialized: true
    }))
.use(cookieCheck) //cargo en session lo que hay en la cookie
.use(localsUserCheck) //cargo en locals lo que hay en session
app.use('/', indexRouter);
app.use('/users', usersRouter);


const axios = require('axios');

async function obtenerIPPublica() {
  try {
    const respuesta = await axios.get('https://api.ipify.org/?format=json');
    const ipPublica = respuesta.data.ip;
    console.log('La dirección IP pública es:', ipPublica);
    return ipPublica;
  } catch (error) {
    console.error('Hubo un error al obtener la dirección IP pública:', error);
    return null;
  }
}

obtenerIPPublica();

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
