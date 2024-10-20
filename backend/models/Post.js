const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  username: { type: String, required: true },  
  description: { type: String, required: true },  
  images: { type: [String], required: false },  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
