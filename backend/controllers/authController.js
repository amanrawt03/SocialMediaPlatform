import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ message: "Logout Successfull" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getMe = async(req,res)=>{
  try {
    const user = await User.findById(req.user._id).select("-password");
    //user me uska password chodhke baki sari details bhejdia 
    return res.status(200).json(user);
  }
  catch(error){
    console.error(error.message);
    return res.status(500).json({ message: "Server error", error });
  }
}
