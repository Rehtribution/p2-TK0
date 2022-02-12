const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Highscore extends Model {}

Highscore.init(
  {
    game_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "highscore",
  }
);

module.exports = Highscore;