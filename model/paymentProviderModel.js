import mongoose from "mongoose";
import moment from "moment-timezone";

const PaymentProviderSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "provider",
    required: true,
  },
  payment: {
    type: String,
    default: "not done",
    required: true,
  },
  plan: {
    type: String,
    default: "no plan",
    // required: true,
  },
  timePeriod: {
    type: Number, // Assuming time period is specified in days
    // required: true,
  },
  created: {
    type: String,
    default: () =>
      moment(new Date()).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm:ss A"),
  },
});

export default mongoose.model("PaymentProvider", PaymentProviderSchema);
