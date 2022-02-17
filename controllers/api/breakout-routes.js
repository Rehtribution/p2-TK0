const router = require("express").Router();

router.get("/", (req, res) => {
	res.render("breakout");
});

module.exports = router;
