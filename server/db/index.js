const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432:boilermaker',
  {
    logging: false, // unless you like the logs
  }
);

//require models

// associations

// export models and db
module.exports = { db };
