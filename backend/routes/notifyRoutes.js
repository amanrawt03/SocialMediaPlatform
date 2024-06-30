import express from "express";
import {getAllNotifications, deleteAllNotifications, deleteOneNotification} from '../controllers/notifyController.js'
import protectRoute from "../middlewares/auth.js";
const router = express.Router();
router.get('/', protectRoute, getAllNotifications);
router.delete('/', protectRoute, deleteAllNotifications);
router.delete('/:id', protectRoute, deleteOneNotification);
export default router;