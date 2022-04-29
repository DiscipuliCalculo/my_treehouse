const { body,validationResult } = require('express-validator');

const passport = require('passport')
const Message = require('../models/message');
const async = require('async');

exports.message_form_get = function(req, res) {
  res.render('new_message', {title: 'Message', user: req.user});
}

exports.message_form_post = [
  body('title').trim().isLength({min: 1}).escape().withMessage('Must have a title').isLength({max: 100}).escape().withMessage('Title is too long'),
  body('text').trim().isLength({min: 1}).escape().withMessage('Must have a message').isLength({max: 1000}).escape().withMessage('Message is too long'),

  function(req, res, next) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render('new_message', {title: 'New Message', user: req.user, errors: error.array()} )
      return
    }

    else {
      const message = new Message( 
        {
          title: req.body.title,
          text: req.body.text,
          user: req.user
      })
      message.save(function (err){
        if (err) {return next(err)}
        res.redirect('/')
      })
    }
  }
]

exports.list_messages = function(req, res) {
  Message.find({})
  .sort({timestamp: -1}).
  populate('user')
  .exec(function (err, message_list) {
    if (err) {return next(err)}
    res.render('index', {title: 'Home', user: req.user, user_messages: message_list})
  })
}

exports.message_delete = function(req, res) {
  Message.findByIdAndDelete(req.body.messageId, function(err){
    if (err) {return next(err)}
    res.redirect('/')
  })
}