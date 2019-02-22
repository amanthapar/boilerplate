const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { db } = require('./db');
const app = express();
const session = require('express-session');
const passport = require('passport');

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'This is not a very secure secret...',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// authentication router
// app.use('/auth', require('./auth'));

//api router
app.use('/api', require('./api'));

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

// move to main dir?
const port = process.env.PORT || 3000;
const init = async () => {
  await db.sync({ force: true });
  app.listen(port, () => {
    console.log(`Your server, listening on port ${port}`);
  });
};
init();
