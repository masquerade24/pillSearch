const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const User = require('./user');
const Prescription = require('./prescription');
const Medication = require('./medication');
const UserPill = require('./userpill');
const Pill = require('./pill');

const db = {};
const sequelize = new Sequelize(config.databse,
  config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Pill = Pill;
db.Prescription = Prescription;
db.Medication = Medication;
db.UserPill = UserPill;

User.init(sequelize);
Pill.init(sequelize);
Prescription.init(sequelize);
Medication.init(sequelize);
UserPill.init(sequelize);

User.associate(db);
Pill.associate(db);
Prescription.associate(db);
Medication.associate(db);
UserPill.associate(db);

module.exports = db;