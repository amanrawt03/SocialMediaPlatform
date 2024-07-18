import mongoose from "mongoose";

const NotifySchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["follow", "like"],
  },
  read: {
    type: Boolean,
    default: false,
  },
},
{ timestamps: true }
);

const NotifyModel = mongoose.model("Notify", NotifySchema);
export default NotifyModel;