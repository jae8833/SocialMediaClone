const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  userProfilePic: { type: String, required: true },
  postPic: { type: String },
  description: { type: String, required: true },
  likes: { type: Map, of: Boolean },
  comments: { type: Array, default: [] },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Post", PostSchema);
