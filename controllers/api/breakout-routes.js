const router = require("express").Router();

router.get("/breakout", (req, res) => {
	res.render("breakout");
});

module.exports = router;
