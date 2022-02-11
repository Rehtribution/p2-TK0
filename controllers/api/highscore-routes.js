const router = require('express').Router();
const { Highscore } = require('../../models');
const withAuth = require('../utils/auth');

// get highscore
router.get('/', (req, res) => {
    // sort method
    Highscore.findAll({
        order: [
            ['highscore', 'DESC'],
        ]
    })
        .then((highscoreData) => res.json(highscoreData))
})