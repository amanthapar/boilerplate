const db = require('./database');

//import db models here
const User = require('./models/user');
//associations here

module.exports = {
  // Include your models in this exports object as well!

  db,
  User,
};
