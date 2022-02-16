const router = require("express").Router();

var oneLinerJoke = require("one-liner-joke");


router.get("/", (req, res) => {
    var getRandomJoke = oneLinerJoke.getRandomJoke({
        exclude_tags: ["dirty", "racist", "sex"],
    });
    console.log(getRandomJoke.body);
  res.json(getRandomJoke.body);
});

module.exports = router;
