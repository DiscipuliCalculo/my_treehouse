const { body,validationResult } = require('express-validator');

const passport = require('passport')
const Message = require('../models/message');
const bcrypt = require('bcryptjs')
const async = require('async');

exports.message_form_get = function(req, res) {
  res.render('new_message', {title: 'Message', user: req.user});
}
