import express from "express";
import protectRoute from "../middlewares/auth.js";
import { getUserProfile, followUnfollowUser, getSuggestions , updateUserProflie} from "../controllers/userController.js";
const router = express.Router();

router.get('/profile/:username', protectRoute, getUserProfile);
router.get('/suggested', protectRoute, getSuggestions);
router.post('/follow/:id', protectRoute, followUnfollowUser);
router.post('/updateUser', protectRoute, updateUserProflie);

export default router;