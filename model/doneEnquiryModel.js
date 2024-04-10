import mongoose from "mongoose";

import moment from "moment-timezone";

const DoneEnquirySchema = new mongoose.Schema({
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
    default: "enquiry done", // Assuming the default value for userstatus in CompletedBooking
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

export default mongoose.model("DoneEnquiry", DoneEnquirySchema);
