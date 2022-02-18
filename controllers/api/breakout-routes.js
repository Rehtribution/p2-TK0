const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (req, res) => {
	if (!req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("layouts/breakout");
});

module.exports = router;
