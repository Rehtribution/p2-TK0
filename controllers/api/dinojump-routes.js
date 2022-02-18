const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('layouts/dinojump');
});

module.exports = router;