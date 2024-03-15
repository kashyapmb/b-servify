import Provider from "../model/providerModel.js";
import Review from "../model/reviewModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose"; // Import mongoose
import AllDeletedServiceProvider from "../model/allDeletedServiceProviderModel.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Favorite from "../model/favoriteModel.js";

export const addFavorite = async (req, res) => {
  try {
    const { userId, providerId } = req.body;

    // Check if userId or itemId is missing
    if (!userId || !providerId) {
      return res.status(400).json({
        success: false,
        message: "User ID and providerId are required",
      });
    }

    // Check if the user already has a favorite list
    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      // If the user doesn't have a favorite list, create a new one
      favorite = new Favorite({
        userId: userId,
        favoriteProviders: [{ providerId: providerId }],
      });
    } else {
      // If the user already has a favorite list, add the item to it
      favorite.favoriteProviders.push({ providerId: providerId });
    }

    await favorite.save();

    return res
      .status(201)
      .json({ success: true, message: "Favorite item added successfully" });
  } catch (error) {
    console.error("Error inserting favorite:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const removeFavorite = async (req, res) => {
  try {
    const { userId, providerId } = req.body;
    // Find the favorite list for the user
    const favorite = await Favorite.findOne({ userId });

    // If the favorite list doesn't exist, return an error
    if (!favorite) {
      return res.status(404).json({
        success: true,
        message: "Favorite list not found for the user",
      });
    }

    // Remove the item from the favorite list
    favorite.favoriteProviders = favorite.favoriteProviders.filter(
      (obj) => obj.providerId.toString() !== providerId
    );

    await favorite.save();

    return res
      .status(201)
      .json({ success: true, message: "Favorite item deleted successfully" });
  } catch (error) {
    console.error("Error inserting favorite:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const isFavorite = async (req, res) => {
  try {
    const { userId, providerId } = req.body;

    // Find the favorite list for the user
    const favorite = await Favorite.findOne({ userId });

    // If the favorite list doesn't exist, return false
    if (!favorite) {
      return res.status(200).json({
        success: false,
        message: "Favorite list not found for the user",
      });
    }

    // Check if the item exists in the favorite list
    const isFav = favorite.favoriteProviders.some(
      (obj) => obj.providerId.toString() === providerId
    );

    return res.status(200).json({
      success: isFav,
      message: "Yes Present",
    });
  } catch (error) {
    console.error("Error checking if item is favorite:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the favorite list for the user
    const favorite = await Favorite.findOne({ userId });

    const providerIds = favorite.favoriteProviders.map((obj) => obj.providerId);

    const favoriteProvidersData = await Promise.all(
      providerIds.map((providerId) => Provider.findOne({ _id: providerId }))
    );

    return res.status(200).json({
      favoriteProvidersData,
      message: "Yes Present",
    });
  } catch (error) {
    console.error("Error checking if item is favorite:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
