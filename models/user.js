const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema (
    {
    first_name: {type: String, required: true },
    last_name: {type: String, required: true},
    user: {type: String, required: true},
    password: {type: String, required: true},
    membership: {type: String, required: true, enum: ['full', 'partial'], default: 'partial'}
    }
);

module.exports = mongoose.model('User', UserSchema);