import User from "../models/userModel.js";
import Tweet from "../models/tweetModel.js";
import Notify from "../models/notifyModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (tweets.length === 0) return res.status(200).json([]);
    return res.status(200).json(tweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
export const createTweets = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newTweet = new Tweet({
      user: userId,
      text,
      img,
    });

    await newTweet.save();
    res.status(201).json(newTweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const deleteTweets = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ error: "Tweet Not Found" });

    if (tweet.img) {
      await cloudinary.uploader.destroy(
        tweet.img.split("/").pop().split(".")[0]
      );
    }
    await Tweet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tweet Deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the tweet" });
    console.log(err);
  }
};

export const commentOnPost = async (req, res) => {
  try {
		const { text } = req.body;
		const postId = req.params.id;
		const userId = req.user._id;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}
		const post = await Tweet.findById(postId);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		const comment = { user: userId, text };

		post.comments.push(comment);
		await post.save();

		res.status(200).json(post);
	} catch (error) {
		console.log("Error in commentOnPost controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const tweetID = req.params.id;
    const tweet = await Tweet.findById(tweetID);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet Not Found" });}

    const userLikedPost = tweet.likes.includes(userId);

    if (userLikedPost) {
      await Tweet.updateOne({ _id: tweetID }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedTweets: tweetID } });

      const updatedLikes = tweet.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      // Like post
      tweet.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedTweets: tweetID } });
      await tweet.save();

      const notification = new Notify({
        from: userId,
        to: tweet.user,
        type: "like",
      });
      await notification.save();

      const updatedLikes = tweet.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (err) {
    console.log("Error in likeUnlikePost controller: ", err);
		res.status(500).json({ error: "Internal server error" });
  }
};

export const getLikedPosts = async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ error: "User not found" });

		const likedPosts = await Tweet.find({ _id: { $in: user.likedTweets } })
			.populate({
				path: "user",
				select: "-password",
			})
			.populate({
				path: "comments.user",
				select: "-password",
			});

		res.status(200).json(likedPosts);
	} catch (error) {
		console.log("Error in getLikedPosts controller: ", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getFollowingTweets = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const followedByMe = await Tweet.find({ user: { $in: user.following } })
      .sort({ created: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    return res.status(200).json(followedByMe);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User donot exist" });

    const userTweets = await Tweet.find({ user: user._id })
      .sort({ created: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

     res.status(200).json(userTweets);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
