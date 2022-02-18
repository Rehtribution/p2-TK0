const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const HighscoreRoutes = require("./highscore-routes.js");
const jokeRoutes = require("./joke-routes.js");
const breakoutRoute = require("./breakout-routes.js");
const dinoJumpRoute = require("./dinojump-routes.js");

router.use("/jokes", jokeRoutes);
router.use("/users", userRoutes);
router.use("/highscore", HighscoreRoutes);
router.use("/breakout", breakoutRoute);
router.use("/dinojump", dinoJumpRoute);

module.exports = router;
