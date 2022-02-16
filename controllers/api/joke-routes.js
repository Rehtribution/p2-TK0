const router = require("express").Router();

// flow of data 3: brings in the npm package to access it
var oneLinerJoke = require("one-liner-joke");

// accesses the package data and returns a result
// this result is requested from the script.js
router.get("/", (req, res) => {
  var getRandomJoke = oneLinerJoke.getRandomJoke({
    exclude_tags: ["dirty", "racist", "sex"],
  });
  // console.log(getRandomJoke.body);
  res.json(getRandomJoke.body);
});

module.exports = router;
