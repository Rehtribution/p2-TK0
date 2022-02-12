const seedUsers = require('./user-seeds');
const seedHighscore = require('./highscore-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
  await seedHighscore();
  console.log('--------------');

  process.exit(0);
};

seedAll();
