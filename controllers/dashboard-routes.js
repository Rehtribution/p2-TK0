const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Highscore } = require("../models");
const withAuth = require("../utils/auth");

// get all highscores for dashboard
router.get("/", withAuth, (req, res) => {
	console.log('===================', req.session.username);
	let user = req.session.username
	Highscore.findAll({
		where: {
			user_id: req.session.user_id,
		},
		attributes: ["game_title", "user_id"],
		include: [
			{
				model: User,
				attributes: ["id"],
				user
			},
		],
	})
		.then((HighscoreDb) => {
			const highscores = HighscoreDb.map((post) => post.get({ plain: true }));
			console.log(highscores);
			res.render("layouts/dashboard", { highscores, loggedIn: true });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/edit/:id", withAuth, (req, res) => {
	HighscoreDb.findByPk(req.params.id, {
		attributes: ["id", "username", "game_title", "highscore"],
		include: [
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((HighscoreDb) => {
			if (HighscoreDb) {
				const highscore = HighscoreDb.get({ plain: true });

				res.render({
					highscore,
					loggedIn: true,
				});
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
