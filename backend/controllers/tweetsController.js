// const User = require('../models/userModel');
// const Tweet = require('../models/tweetModel');
// const { v2: cloudinary } = require('cloudinary');

// const createTweets = async (req, res) => {
//   try {
//     console.log("req.user:", req.user); 
//     const { text } = req.body;
//     let { img } = req.body;
//     const userId = req.user._id.toString();

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!text && !img) {
//       return res.status(400).json({ error: "Post must have text or image" });
//     }

//     if (img) {
//       const uploadedResponse = await cloudinary.uploader.upload(img);
//       img = uploadedResponse.secure_url;
//     }

//     const newTweet = new Tweet({
//       user: userId,
//       text,
//       img,
//     });

//     await newTweet.save();
//     res.status(201).json(newTweet);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//     console.log(err);
//   }
// };

// module.exports = { createTweets };
