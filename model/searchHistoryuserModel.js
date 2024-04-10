// searchHistoryUserModel.js
import mongoose from "mongoose";

// Define the schema for search history
const searchHistoryUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  searches: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },

  searches2: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },
});
function arrayLimit(val) {
  return val.length <= 5;
}

// Create the SearchHistory model
export default mongoose.model("SearchHistoryUser", searchHistoryUserSchema);
