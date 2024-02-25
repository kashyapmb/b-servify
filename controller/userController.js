import user from "../model/userModel.js";
import Review from "../model/reviewModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AllDeletedServiceProvider from "../model/allDeletedServiceProviderModel.js";

// Login Functionality
const comparePasswords = async (inputPassword, hashedPassword) => {
  try {
    // Compare inputPassword with hashedPassword
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match; // true if passwords match, false otherwise
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false; // Return false in case of error
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const userExist = await user.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ error: "Email not exist" });
    }
    if (!(await comparePasswords(password, userExist.password))) {
      return res.status(401).json({ error: "Incorrect Password" });
    }
    const token = Jwt.sign(
      {
        userId: userExist._id,
        email: userExist.email,
        fname: userExist.fname,
        lname: userExist.lname,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).json({ message: "Login successfully", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create Functionality
export const create = async (req, res) => {
  try {
    const { fname, lname, mobile, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with the hashed password
    const newUser = new user({
      fname,
      lname,
      mobile,
      email,
      password: hashedPassword,
      // Add any other fields you want to save
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    const token = Jwt.sign(
      {
        userId: savedUser._id,
        email: savedUser.email,
        fname: savedUser.fname,
        lname: savedUser.lname,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).json({ savedUser, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//for fetching all record
export const getAll = async (req, res) => {
  try {
    const userData = await user.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for fetching one perticular record
export const searchByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Corrected variable name
    const userExist = await user.find({ email });
    if (!userExist || userExist.length === 0) {
      // Check if userExist is empty
      return res.status(404).json({ msg: "Email does not exist" });
    }
    res.status(200).json({ msg: "Email exist" });
  } catch (error) {
    res.status(500).json({ error: error }); // Use error.message to get a more descriptive error message
  }
};

//for updating password
export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if the email exists in the user collection
    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Generate a new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password in the database
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//for fetching one perticular record
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating data
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const updatedData = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // await Review.updateMany(
    //   { userId: id },
    //   {
    //     $set: {
    //       "userId.name": req.body.name,
    //       "userId.mobile": req.body.mobile,
    //     },
    //   }
    // );
    // Call a function to update AllDeletedServiceProvider collection
    await updateAllDeletedServiceProvider(id, req.body);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for deleting record
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    await user.findByIdAndDelete(id);

    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const logout = async (req, res) => {
  try {
    const tokenExist = req.cookies.token;

    if (!tokenExist) {
      return res.status(400).json({ message: "login required" });
    }
    res.clearCookie("token");
    res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const updatewithlogintoken = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await user.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user data not found" });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const updatedData = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//when userdata updated it automatically update in deletedallserviceprovider collection
const updateAllDeletedServiceProvider = async (userId, updatedUserData) => {
  try {
    // Find entries in AllDeletedServiceProvider with the specified userId
    const entriesToUpdate = await AllDeletedServiceProvider.find({
      "reviews.userId._id": userId,
    });

    // Update user information in each entry
    for (const entry of entriesToUpdate) {
      entry.reviews.forEach((review) => {
        if (review.userId._id.toString() === userId) {
          review.userId.name = updatedUserData.name;
          review.userId.mobile = updatedUserData.mobile;
        }
      });

      await entry.save();
    }
  } catch (error) {
    console.error("Error updating AllDeletedServiceProvider:", error);
  }
};
