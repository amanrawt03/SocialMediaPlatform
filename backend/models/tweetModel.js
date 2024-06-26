// const mongoose = require("mongoose");

// const TweetSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   text: {
//     type: String,
//   },
//   img: {
//     type: String,
//   },
//   comments: [
//     {
//       text: {
//         type: String,
//       },
//       user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     },
//   ],

//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

//   likedStatus: {
//     type: Boolean,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const TweetModel = mongoose.model("Tweet", TweetSchema);
// module.exports = TweetModel;
