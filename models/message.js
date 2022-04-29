const mongoose = require('mongoose')
const { DateTime, } = require("luxon");

const { Schema } = mongoose;

const MessageSchema = new Schema (
    {
        title: {type: String, required: true},
        text: {type: String , required: true},
        timestamp: {type: Date, default: Date.now },
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    }
)

MessageSchema.virtual('datetime').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_MED); //format 'October 22, 9:38 PM'
  });

module.exports = mongoose.model('Message', MessageSchema)
