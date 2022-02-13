const User = require('./User');
const Highscore = require('./Highscore');

User.hasMany(Highscore, {
    foreignKey: 'user_id'
});

Highscore.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Highscore};