const sequelize = require('../config/connection');
const { Highscore } = require('../models');

const scoreData = [
  {
    game_title: 'Fake Game1',
    user_id: 1
  },
  {
    game_title: 'Fake Game2',
    user_id: 2
  }
];

const seedHighscore = () => Highscore.bulkCreate(scoreData, {individualHooks: true});

module.exports = seedHighscore;