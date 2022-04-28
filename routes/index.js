var express = require('express')
var router = express.Router();
var passport = require('passport')

var user_controller = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home', user: req.user });
});

router.get('/login', user_controller.login_form_get)

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

router.get('/signup', user_controller.signup_form_get)

router.post('/signup', user_controller.signup_form_post)

router.get('/joinclub', )

router.post('/joinclub', )

router.get("/logout", user_controller.logout_get)


module.exports = router;
