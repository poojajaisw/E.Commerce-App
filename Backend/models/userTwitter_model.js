const mongoose = require('mongoose');

const twitterSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  Password: String,
 
  // Add the createdAt field
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current timestamp
  },
});

const TwitterModel = mongoose.model('twitter', twitterSchema);

module.exports = TwitterModel;
