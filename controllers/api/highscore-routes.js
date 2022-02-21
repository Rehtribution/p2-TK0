const router = require("express").Router();
const { Highscore, User } = require("../../models");

router.get("/", (req, res) => {
  Highscore.findAll({
    attributes: ["game_title", "user_id", "score"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })

    .then((scores) => {
      res.json(scores)
     
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
