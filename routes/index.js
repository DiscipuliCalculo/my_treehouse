var express = require('express')
var router = express.Router();
var passport = require('passport')

var user_controller = require('../controllers/userController')
var message_controller = require('../controllers/messageController')

/* GET home page. */
router.get('/', message_controller.list_messages);

router.get('/login', user_controller.login_form_get)

router.post("/login/password", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true, 
    failureFlash: true
  })(req, res, next);
});

router.get('/signup', user_controller.signup_form_get)

router.post('/signup', user_controller.signup_form_post)

router.get('/joinclub', user_controller.join_form_get)

router.post('/joinclub', user_controller.join_form_post)

router.get("/logout", user_controller.logout_get)

router.get('/new_message', message_controller.message_form_get)

router.post('/new_message', message_controller.message_form_post)

router.post('/message/delete', message_controller.message_delete)


module.exports = router;
