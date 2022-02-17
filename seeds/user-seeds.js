const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: 'Paul',
    password: 'password123'
  },
  {
    username: 'Alfonso',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;