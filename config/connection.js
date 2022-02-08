// import sequelize constructor
const Sequelize = require("sequelize");
require("dotenv").config();

// create connection to db
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
