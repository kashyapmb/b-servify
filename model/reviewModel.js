import mongoose from "mongoose";
import moment from "moment-timezone";

const reviewSchema = new mongoose.Schema({
  ProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "provider",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    default: () =>
      moment(new Date()).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm:ss A"),
  },
});

export default mongoose.model("Review", reviewSchema);
