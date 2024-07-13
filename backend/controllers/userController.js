import User from "../models/userModel.js";
import Notify from "../models/notifyModel.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const userId = req.user._id;
    const followedByMe = await User.findById(userId).select("following");
    const otherUsers = await User.aggregate([
      {
        $match: { _id: { $ne: userId } },
      },
      { $sample: { size: 10 } },
    ]);

    // filter the users who I've already followed
    const filteredUsers = otherUsers.filter(
      (user) => !followedByMe.following.includes(user._id)
    );

    const suggestedUsers = filteredUsers.splice(0, 4);
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUser = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "User cannot follow/unfollow themselves" });
    }

    if (!currentUser || !otherUser) {
      return res.status(400).json({ error: "User Not Found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed Successfully" });
    } else {
      // follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      const notification = new Notify({
        from: req.user._id,
        to: id,
        type: "follow",
        read: false,
      });

      await notification.save();
      res.status(200).json({ message: "User followed Successfully" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateUserProflie = async (req, res) => {
  const { fullName, username, oldPassword, newPassword, bio, link, email } =
    req.body;
  let { profileImg, coverImg } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User doesn't exist" });

    if ((!oldPassword && newPassword) || (!newPassword && oldPassword))
      return res.status(400).json({ error: "Enter both passwords" });
    if (oldPassword && newPassword) {
      const checkPassword = await bcrypt.compare(oldPassword, user.password);
      if (!checkPassword)
        return res.status(400).json({ error: "You entered wrong password" });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      user.profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      user.coverImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};
