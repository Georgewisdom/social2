const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const postSchema = new mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  body: {
    type: String,
    reguired: true,
    trim: true
  },
  title: {
    type: String,
    reguired: true,
    trim: true
  },
  image: {
    type: String
  },
  likeCount: {
    type: Number,
    required: false,
    default: 0
  },
  likes: [
    {
      user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      comment: {
        type: String,
        required: true
      },
      name: {
        type: String
      }
    }
  ],
  category: {
    type: String,
    required: true
  },
  follow: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  followCount: {
    type: Number,
    required: false,
    default: 0
  }
});

postSchema.plugin(timestamp);
module.exports = Post = mongoose.model("Post", postSchema);
