const sequelize = require('../config/connection');
const { Highscore } = require('../models');

const scoredata = [
  {
    game_title: 'Fake Game1',
    user_id: '1'
  },
  {
    game_title: 'Fake Game2',
    id: '2'
  }
];

const seedHighscore = () => Highscore.bulkCreate(scoredata, {individualHooks: true});

module.exports = seedHighscore;