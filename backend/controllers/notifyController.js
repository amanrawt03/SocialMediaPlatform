import Notify from "../models/notifyModel.js";

export const getAllNotifications = async (req, res) => {
  
  try {
    const userId = req.user._id;
    const notifications = await Notify.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });
    await Notify.updateMany({ to: userId },{ read: true });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notify.deleteMany({ to: userId });
    return res.status(200).json({ message: "All Notifications Cleared!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user._id;

    const notification = await Notify.findById(notificationId);
    if (!notification)
      return res.status(404).json({ error: "Notification not found" });

    if (notification.to.toString() !== userId.toString())
      return res.status(404).json({ error: "User not Authenticated" });

    await Notify.deleteOne(notification)
    return res.status(200).json({ message: "Notification Deleted Successfully!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};
