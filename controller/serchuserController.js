import User from "../model/userModel.js";
import mongoose from "mongoose";
import SearchHistoryUser from "../model/searchHistoryuserModel.js";

export const saveSearch = async (req, res) => {
  try {
    const { userId, searchQuery } = req.body;

    // Find the search history for the user
    let searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Create a new search history if not exists
      searchHistory = new SearchHistoryUser({
        userId: userId,
        searches: [],
      });
    }

    // Add the new search query to the searches array
    searchHistory.searches.unshift(searchQuery);

    // If the number of searches exceeds the limit of 5, remove the oldest one
    if (searchHistory.searches.length > 5) {
      searchHistory.searches.pop(); // Remove the oldest search
    }

    // Save the updated search history
    await searchHistory.save();

    res.status(200).send("Search saved successfully!");
  } catch (error) {
    console.error("Error saving search:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const clearAllSearches = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the search history for the user
    let searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Return a message if no search history found
      return res.status(404).send("Search history not found");
    }

    // Clear all search history entries
    searchHistory.searches = [];

    // Save the updated search history
    await searchHistory.save();

    res.status(200).send("Search history cleared successfully!");
  } catch (error) {
    console.error("Error clearing search history:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllSearches = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the search history for the user
    const searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Return a message if no search history found
      return res.status(404).send("Search history not found");
    }

    // Return the search history entries
    res.status(200).json(searchHistory.searches);
  } catch (error) {
    console.error("Error retrieving search history:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteSearch = async (req, res) => {
  try {
    const { userId, searchIndex } = req.body;

    // Find the search history for the user
    let searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Return a message if no search history found
      return res.status(404).send("Search history not found");
    }

    // Remove the search entry at the specified index
    searchHistory.searches.splice(searchIndex, 1);

    // Save the updated search history
    await searchHistory.save();

    res.status(200).send("Search entry deleted successfully!");
  } catch (error) {
    console.error("Error deleting search entry:", error);
    res.status(500).send("Internal Server Error");
  }
};

//for searches2
export const saveSearch2 = async (req, res) => {
  try {
    const { userId, searchQuery } = req.body;

    // Find the search history for the user
    let searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Create a new search history if not exists
      searchHistory = new SearchHistoryUser({
        userId: userId,
        searches2: [],
      });
    }

    // Add the new search query to the searches array
    searchHistory.searches2.unshift(searchQuery);

    // If the number of searches exceeds the limit of 5, remove the oldest one
    if (searchHistory.searches2.length > 5) {
      searchHistory.searches2.pop(); // Remove the oldest search
    }

    // Save the updated search history
    await searchHistory.save();

    res.status(200).send("Search saved successfully!");
  } catch (error) {
    console.error("Error saving search:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const clearAllSearches2 = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the search history for the user
    let searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Return a message if no search history found
      return res.status(404).send("Search history not found");
    }

    // Clear all search history entries
    searchHistory.searches2 = [];

    // Save the updated search history
    await searchHistory.save();

    res.status(200).send("Search history cleared successfully!");
  } catch (error) {
    console.error("Error clearing search history:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllSearches2 = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the search history for the user
    const searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Return a message if no search history found
      return res.status(404).send("Search history not found");
    }

    // Return the search history entries
    res.status(200).json(searchHistory.searches2);
  } catch (error) {
    console.error("Error retrieving search history:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteSearch2 = async (req, res) => {
  try {
    const { userId, searchIndex } = req.body;

    // Find the search history for the user
    let searchHistory = await SearchHistoryUser.findOne({
      userId: userId,
    });

    if (!searchHistory) {
      // Return a message if no search history found
      return res.status(404).send("Search history not found");
    }

    // Remove the search entry at the specified index
    searchHistory.searches2.splice(searchIndex, 1);

    // Save the updated search history
    await searchHistory.save();

    res.status(200).send("Search entry deleted successfully!");
  } catch (error) {
    console.error("Error deleting search entry:", error);
    res.status(500).send("Internal Server Error");
  }
};
