const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Highscore } = require("../models");

// get all highscores for homepage
router.get("/", (req, res) => {
	console.log("req.session");
	Highscore.findAll({
		attributes: ["id"],
		include: [
			{
				model: User,
				attributes: ["id"],
			},
		],
	})
		.then((HighscoreDb) => {
			const highscores = HighscoreDb.map((post) => post.get({ plain: true }));
			console.log(highscores);
			res.render("homepage", {
				// ^this renders the homepage. No touch!
				highscores,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// get single highscore
router.get("/highscore/:id", (req, res) => {
	Highscore.findOne({
		where: {
			id: req.params.id,
		},
		attributes: ["id", "username", "game_title", "highscore"],
		include: [
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((HighscoreDb) => {
			if (!HighscoreDb) {
				res.status(404).json({ message: "No highscore found with this ID!" });
				return;
			}

			const highscore = HighscoreDb.get({ plain: true });

			res.render({
				highscore,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("login");
});

router.get("/signup", (req, res) => {
	if (!req.session.loggedIn) {
		res.render("signup");
	} else {
		res.redirect("/");
	}
});

module.exports = router;

