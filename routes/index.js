var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/signup', user_controller.signup_form_get)

router.post('/signup', user_controller.signup_form_post)

module.exports = router;
