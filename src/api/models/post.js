const mongoose = require("../database/index");

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  attachments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const Post = moongose.model("Post", PostSchema);

module.exports = Post;
