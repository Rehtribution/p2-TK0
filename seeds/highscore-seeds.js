const sequelize = require('../config/connection');
const { Highscore } = require('../models');

const scoreData = [
  {
    game_title: 'Breakout',
    user_id: 1,
    score: 1200
  },
  {
    game_title: 'Jump',
    user_id: 2,
    score: 2100
  }
];

const seedHighscore = () => Highscore.bulkCreate(scoreData, {individualHooks: true});

module.exports = seedHighscore;