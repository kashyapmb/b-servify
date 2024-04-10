import mongoose from "mongoose";
import moment from "moment-timezone";

const EnquirySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "provider",
    required: true,
  },

  enquiry_for: {
    type: String,
    default: "",
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  estatus: {
    type: String,
    default: "enquired",
    required: true,
  },
  created: {
    type: String,
    default: () =>
      moment(new Date()).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm:ss A"),
  },
  createdAt: {
    type: Date, // Changed type to Date
    default: Date.now, // Default to current date and time
  },
});

export default mongoose.model("Enquiry", EnquirySchema);
