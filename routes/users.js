var express = require('express');
const user = require('../models/user');
var router = express.Router();

var user_controller = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:username', function(req, res, next) {
  res.render('account', {title: 'Account', user: req.user})
})

router.post('/:username', user_controller.admin_confirm )

module.exports = router;
