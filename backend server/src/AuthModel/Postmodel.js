const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyProfile: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

module.exports = Post;  