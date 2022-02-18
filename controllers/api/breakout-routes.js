const router = require("express").Router();

router.get("/", (req, res) => {
	res.render("layouts/breakout");
});

module.exports = router;
