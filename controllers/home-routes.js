const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', {
    created_at: new Date(),
    user: {
      username: 'test_user'
    }
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;