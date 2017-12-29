// server.js
// where your node app starts

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

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.info('connection successful'))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// http://expressjs.com/en/starter/basic-routing.html
app.use(express.static(path.resolve(__dirname, 'views/index.html')));

app.use('/api', apiRouter);
app.use('/auth', authRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
