const router = require("express").Router();
const withAuth = require("../../utils/auth");

<<<<<<< HEAD
router.get("/breakout", (req, res) => {
	res.render("breakout");
=======
router.get("/", withAuth, (req, res) => {
	if (!req.session.loggedIn) {
		res.redirect("/");
		return;
	}

	res.render("layouts/breakout");
>>>>>>> d89b4a525d3ce91b7b9344bfee1cd77693cf73ff
});

module.exports = router;
