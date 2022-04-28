const { body,validationResult } = require('express-validator');

const passport = require('passport')
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const async = require('async');

exports.login_form_get = function(req, res) {
  res.render('login', {title: 'Login', user: req.user, messages: req.session.messages});
}

// Using this code for login hangs the code 
/*
exports.login_form_post = function(req, res) {
  passport.authenticate("local", 
  {
  successRedirect: "/",
  failureRedirect: "/login"
  })
}
*/

exports.join_form_get = function(req, res) {
  res.render('join_club', {title: 'Join', user: req.user});
}

exports.join_form_post = function(req, res) {
  if ( req.body.text === process.env.CLUB_PASS) {
    res.render('join_club', {title: 'Join', user: req.user, pass_result: true});
  }
  else {
    res.render('join_club', {title: 'Join', user: req.user, pass_result: false});
  }
}

exports.signup_form_get = function(req, res) {
  res.render('signup', {title: 'Signup'});
}

exports.signup_form_post = [

  body('first_name').trim().isLength({min: 1}).escape().withMessage('Must enter a name').isLength({max: 60}).escape().withMessage('Name is too long'),
  body('last_name').trim().isLength({min: 1}).escape().withMessage('Must enter a name').isLength({max: 60}).escape().withMessage('Name is too long'),
  body('username').trim().isLength({min: 4}).escape().withMessage('Username must be minimum of 4 characters').isLength({max: 20}).escape().withMessage('Username is too long'),
  body('password').trim().isLength({min: 4}).escape().withMessage('Password must be minimum of 4 characters').isLength({max: 60}).escape().withMessage('Password is too long'),
  body('password_confirm'.trim()).custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),

  function(req, res, next) {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.render('signup', {title: 'Signup', user: req.body, errors: error.array()} )
      return
    }

    User.find({user: req.body.user}, function(err, found){
      if (err) {return next(err)};
      if (found === []) {
        console.log(found)
        var err = new Error('User already exists')
        err.status = 400;
        return next(err)
      }
      else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {return next(err)}
          else{
            const user = new User (
              {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPassword,
              }
            )
            user.save(function (err) {
              if (err) {return next(err)}
              res.redirect('/login')
            })
          }
          
        })
      }
    })

  }
]

exports.logout_get = function(req, res) {
  req.logout();
  res.redirect('/');
}