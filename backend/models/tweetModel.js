import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  img: {
    type: String,
    default: "",
  },
  comments: [
    {
      text: {type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  
  likes: [
    {
      likedStatus: { type: Boolean, default: false },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TweetModel = mongoose.model("Tweet", TweetSchema);
export default TweetModel;
