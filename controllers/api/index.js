const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const HighscoreRoutes = require("./highscore-routes.js");
const jokeRoutes = require("./joke-routes");
const breakoutRoute = require("./breakout-routes");

router.use("/jokes", jokeRoutes);
router.use("/users", userRoutes);
router.use("/highscore", HighscoreRoutes);
router.use("/breakout", breakoutRoute);

module.exports = router;
