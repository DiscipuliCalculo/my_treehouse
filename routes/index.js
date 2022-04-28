var express = require('express')
var router = express.Router();
var passport = require('passport')

var user_controller = require('../controllers/userController')
var message_controller = require('../controllers/messageController')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home', user: req.user });
});

router.get('/login', user_controller.login_form_get)

router.post("/login/password", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true
  })(req, res, next);
});

/*
router.post('/login/password', (req, res, next) =>passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));
*/

// Current route work around for login
/*
router.post('/login/attempt', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: '/login'
}));
*/

//Using this route hangs the code
/*
router.post('/login', user_controller.login_form_post)
*/

router.get('/signup', user_controller.signup_form_get)

router.post('/signup', user_controller.signup_form_post)

router.get('/joinclub', user_controller.join_form_get)

router.post('/joinclub', )

router.get("/logout", user_controller.logout_get)

router.get('/new_message', message_controller.message_form_get)


module.exports = router;
