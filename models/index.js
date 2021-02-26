const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const Pill = require('./pill');

const db = {};
const sequelize = new Sequelize(config.databse,
  config.username, config.password, config);
db.sequelize = sequelize;

db.Pill = Pill;

Pill.init(sequelize);

Pill.associate(db);

module.exports = db;