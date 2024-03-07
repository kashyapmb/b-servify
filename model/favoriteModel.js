import mongoose from "mongoose";
import Review from "./reviewModel.js"; // Import the Review model
import bcrypt from "bcrypt";
import moment from "moment-timezone";

// Define the schema for user favorites
const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  favoriteProviders: [
    {
      providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
        required: true,
      },
    },
  ],
});

// Create the Favorite model
export default mongoose.model("Favorite", favoriteSchema);
