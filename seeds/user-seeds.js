const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    username: 'user1',
    password: 'password123'
  },
  {
    username: 'user2',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;