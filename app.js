const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const axios = require('axios');
const cheerio = require('cheerio');
const mysql = require("mysql");
const fs = require('fs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const iconv = require('iconv-lite');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');

const registerRouter =require('./routes/register');
const JPMorganRouter =require('./routes/JPMorgan');
const institutionsRouter = require('./routes/institutions');
const cityRouter = require('./routes/city');
const boaRouter = require('./routes/boa');
const morganRouter = require('./routes/morgan');
const goldRouter = require('./routes/gold');
const fmrRouter = require('./routes/fmr');
const creditRouter = require('./routes/credit');
const franklinRouter = require('./routes/franklin');
const gurulistRouter = require('./routes/gurulist');
const boardlistRouter = require('./routes/boardlist');
const boardwriteRouter = require('./routes/boardwrite');
const boardviewRouter = require('./routes/boardview');
const warrenBRouter = require('./routes/warrenB');
const georgeRouter = require('./routes/george');
const bruceRouter = require('./routes/bruce');
const booneRouter = require('./routes/boone');
const wallaceRouter = require('./routes/wallace');
const pabraiRouter = require('./routes/pabrai');
const jimRouter = require('./routes/jim');
const arnieRouter = require('./routes/arnie');
const billRouter = require('./routes/bill');
const charlesRouter =require('./routes/charles');
const bruceSRouter = require('./routes/bruceS');
const boardupdateRouter = require('./routes/boardupdate');
const aboutRouter = require('./routes/about');
const enterpwRouter = require('./routes/enterpw');
const enter_infoRouter = require('./routes/enter_info');

const { html } = require('cheerio');
const { title } = require('process');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret:'keyboard cat',
//   resave: false,
//   saveUninitialized:true
// }))

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/JPMorgan',JPMorganRouter);
app.use('/institutions',institutionsRouter);
app.use('/city',cityRouter);
app.use('/boa',boaRouter);
app.use('/morgan',morganRouter);
app.use('/gold',goldRouter);
app.use('/fmr',fmrRouter);
app.use('/credit',creditRouter);
app.use('/franklin',franklinRouter);
app.use('/index',indexRouter);
app.use('/gurulist',gurulistRouter);
app.use('/boardlist',boardlistRouter);
app.use('/boardwrite',boardwriteRouter);
app.use('/boardview',boardviewRouter);
app.use('/warrenB',warrenBRouter);
app.use('/george',georgeRouter);
app.use('/bruce',bruceRouter);
app.use('/boone',booneRouter);
app.use('/wallace',wallaceRouter);
app.use('/pabrai',pabraiRouter);
app.use('/jim',jimRouter);
app.use('/arnie',arnieRouter);
app.use('/bill',billRouter);
app.use('/charles',charlesRouter);
app.use('/bruceS',bruceSRouter);
app.use('/boardupdate',boardupdateRouter);
app.use('/about',aboutRouter);
app.use('/enterpw',enterpwRouter);
app.use('/enter_info',enter_infoRouter);

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


