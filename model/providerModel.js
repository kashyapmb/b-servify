import mongoose from "mongoose";
import Review from "./reviewModel.js"; // Import the Review model
import bcrypt from "bcrypt";
import moment from "moment-timezone";

const providerSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  expertise: [{ type: String }],
  completed_work: {
    type: Number,
    default: 0,
  },
  mobileverified: {
    type: Boolean,
    default: false,
  },
  emailverified: {
    type: Boolean,
    default: false,
  },
  overallRating: {
    type: Number,
    default: 0,
    required: false,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  profilePhoto: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/theservify-e1a5a.appspot.com/o/d188a147-120c-4c70-af3e-464488fb0419?alt=media&token=6fc004b1-4a6c-4385-90aa-14337397c446",
  },
  bgPhoto: [{ type: String }],
  created: {
    type: String,
    default: () =>
      moment(new Date()).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm:ss A"),
  },
});

providerSchema.pre("findOneAndDelete", async function (next) {
  const serviceProviderId = this._conditions._id;

  // Delete associated reviews
  await Review.deleteMany({ serviceProviderId });
  next();
});

export default mongoose.model("Provider", providerSchema);
