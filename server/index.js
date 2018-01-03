require('dotenv').config({path: __dirname + '/.env'});

// init project
const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api.js');
const authRouter = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {useMongoClient: true})
  .then(() => console.info('connection successful'))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api', apiRouter);
app.use('/auth', authRouter);

// listen for requests :)
app.listen(PORT, function () {
  console.info(`Listening on port ${PORT}`);
});
