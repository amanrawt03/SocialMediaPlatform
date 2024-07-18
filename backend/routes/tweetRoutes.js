import express from "express";
import { getAllTweets, createTweets, deleteTweets, commentOnPost, likeUnlikePost , getLikedPosts, getFollowingTweets, getUserPosts} from "../controllers/tweetsController.js";
import protectRoute from "../middlewares/auth.js";
const router = express.Router();

router.get("/all", protectRoute, getAllTweets);
router.get("/user/:username", protectRoute, getUserPosts);
router.get("/followingTweets", protectRoute, getFollowingTweets);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/create", protectRoute, createTweets);
router.delete("/:id", protectRoute, deleteTweets);
router.post("/comment/:id", protectRoute, commentOnPost);
router.post("/like/:id", protectRoute, likeUnlikePost);

export default router;
