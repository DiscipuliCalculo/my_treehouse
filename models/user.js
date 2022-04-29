const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema (
    {
    first_name: {type: String, required: true },
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    membership: {type: String, required: true, enum: ['full', 'partial'], default: 'partial'},
    admin: {type: Boolean, required: true, default: false}
    }
);

// Virtual for author's URL
UserSchema
.virtual('url')
.get(function () {
  return '/users/' + this.username;
});

module.exports = mongoose.model('User', UserSchema);