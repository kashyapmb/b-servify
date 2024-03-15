import mongoose from "mongoose";
import moment from "moment-timezone";
const userChangesSchema = new mongoose.Schema({
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
  profilePhoto: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/theservify-e1a5a.appspot.com/o/d188a147-120c-4c70-af3e-464488fb0419?alt=media&token=6fc004b1-4a6c-4385-90aa-14337397c446",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegx.test(email);
      },
      message: "Email format is invalid",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return password.length >= 6;
      },
      message: "password must be greter than 6 character",
    },
  },
  created: {
    type: String,
    default: () =>
      moment(new Date()).tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm:ss A"),
  },
});

export default mongoose.model("UserChanges", userChangesSchema);
