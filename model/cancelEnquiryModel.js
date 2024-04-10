import mongoose from "mongoose";

import moment from "moment-timezone";

const CancelEnquirySchema = new mongoose.Schema({
  enquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enquiry",
    required: true,
  },
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
  estatus: {
    type: String,
    default: "cancel enquiry", // Assuming the default value for userstatus in CompletedBooking
  },
  reason: {
    type: String,
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

export default mongoose.model("CancelEnquiry", CancelEnquirySchema);
