import User from "../model/userModel.js";
import Review from "../model/reviewModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AllDeletedServiceProvider from "../model/allDeletedServiceProviderModel.js";
import UserChanges from "../model/userChangesModel.js";
import ProviderChanges from "../model/providerChangesModel.js";

export const userEditedData = async (req, res) => {
  try {
    const newUser = new UserChanges(req.body);

    // Save the user to the database
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ savedUser, message: "User changes saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllUserEditedData = async (req, res) => {
  try {
    // Save the user to the database
    const savedUser = await UserChanges.find();
    res.status(200).json({ savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const providerEditedData = async (req, res) => {
  try {
    const newUser = new ProviderChanges(req.body);

    // Save the user to the database
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ savedUser, message: "Provider changes saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message, msg: "Here error occurs" });
  }
};
export const getAllProviderEditedData = async (req, res) => {
  try {
    // Save the user to the database
    const savedUser = await ProviderChanges.find();
    res.status(200).json({ savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
