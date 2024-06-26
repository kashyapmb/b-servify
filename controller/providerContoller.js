import Provider from "../model/providerModel.js";
import Review from "../model/reviewModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose"; // Import mongoose
import AllDeletedServiceProvider from "../model/allDeletedServiceProviderModel.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

export const temp = async () => {
  try {
    // Fetch all providers
    const providers = await Provider.find();

    // Iterate through each provider
    for (const provider of providers) {
      // Update the provider's overallRating field

      provider.visitcharge = Math.floor(Math.random() * 100) * 10;

      // Save the updated provider
      await provider.save();
    }

    console.log("Overall ratings updated successfully for all providers.");
  } catch (error) {
    console.error("Error updating overall ratings:", error);
  }
};

// Sign in
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
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await Provider.findOne({ email });

    // Check if user exists and password is correct
    if (!user || !(await comparePasswords(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );

    // Send token to client
    res.json({ token, approved: user.approved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create Service Provider
export const createServiceProvider = async (req, res) => {
  try {
    const serviceProviderData = new Provider(req.body);
    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      serviceProviderData.password,
      salt
    );
    serviceProviderData.password = hashedPassword;

    const savedData = await serviceProviderData.save();
    const token = jwt.sign(
      {
        userId: savedData._id,
        email: savedData.email,
        fname: savedData.fname,
        lname: savedData.lname,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).json({ savedData, token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating password
export const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if the email exists in the user collection
    const existingUser = await Provider.findOne({ email });

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
export const searchByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Corrected variable name
    const userExist = await Provider.find({ email });
    if (!userExist || userExist.length === 0) {
      // Check if userExist is empty
      return res.status(404).json({ msg: "Email does not exist" });
    }
    res.status(200).json({ msg: "Email exist" });
  } catch (error) {
    res.status(500).json({ error: error }); // Use error.message to get a more descriptive error message
  }
};

// Get Provider's based on city and profession
export const getServiceProviders = async (req, res) => {
  try {
    const { city, domain } = req.body;
    const serviceProviderData = await Provider.find({
      $and: [{ city }, { domain }],
    }).select("-password");
    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }
    res.status(200).json(serviceProviderData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for fetching one perticular record
export const getOneServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Provider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "service provider data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating data
export const updateProviderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Provider.findById(id);
    console.log(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Provider data not found" });
    }
    const updatedData = await Provider.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//for updating data
export const providerApproved = async (req, res) => {
  try {
    const id = req.body._id;
    const userExist = await Provider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Provider data not found" });
    }

    req.body.approved = true;
    const updatedData = await Provider.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating data
export const mobileVerified = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Provider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Provider data not found" });
    }

    // Update the mobileverified field to true
    const updatedData = await Provider.findByIdAndUpdate(
      id,
      { mobileverified: true }, // Update only the mobileverified field
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//for updating data
export const emailVerified = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Provider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Provider data not found" });
    }

    // Update the mobileverified field to true
    const updatedData = await Provider.findByIdAndUpdate(
      id,
      { emailverified: true }, // Update only the mobileverified field
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get all Provider's details
export const getAllServiceProviders = async (req, res) => {
  try {
    const serviceProviderData = await Provider.find().select("-password");
    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }
    res.status(200).json(serviceProviderData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating data
export const updateServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Provider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "serviceprovider data not found" });
    }
    const updatedData = await Provider.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // await Review.updateMany(
    //   { serviceProviderId: id },
    //   {
    //     $set: {
    //       "serviceProviderId.spname": req.body.spname,
    //       "serviceProviderId.spemail": req.body.spemail,
    //     },
    //   }
    // );

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for deleting record
export const deleteServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const serviceProviderExist = await Provider.findById(id);

    if (!serviceProviderExist) {
      return res.status(404).json({ msg: "Service provider not found" });
    }
    // Create an entry in the AllDeletedServiceProvider collection
    // const deletedServiceProvider = new AllDeletedServiceProvider({
    //   serviceProviderId: serviceProviderExist._id,
    //   reviews: serviceProviderExist.reviews, // Copy reviews from the original service provider
    // });
    // await deletedServiceProvider.save();

    // Delete the service provider
    // await ServiceProvider.findByIdAndDelete(id);

    // Fetch the associated reviews
    // const reviews = await Review.find({ serviceProviderId: id });
    const reviews = await Review.find({ serviceProviderId: id }).populate(
      "userId",
      "name mobile"
    );
    const formattedReviews = reviews.map((review) => ({
      userId: {
        _id: review.userId._id,
        name: review.userId.name,
        mobile: review.userId.mobile,
      },
      rating: review.rating,
      review: review.reviews,
    }));

    // Create an entry in the AllDeletedServiceProvider collection
    const deletedServiceProvider = new AllDeletedServiceProvider({
      serviceProviderId: serviceProviderExist._id,
      serviceProviderInfo: {
        spname: serviceProviderExist.spname,
        spmobile: serviceProviderExist.spmobile,
        spaddress: serviceProviderExist.spaddress,
        spcity: serviceProviderExist.spcity,
        spservicename: serviceProviderExist.spservicename,
        spemail: serviceProviderExist.spemail,
        sppassword: serviceProviderExist.sppassword,
      },
      reviews: formattedReviews,
    });

    // Save the entry to the AllDeletedServiceProvider collection
    await deletedServiceProvider.save();

    // Delete the service provider and associated reviews
    await Provider.findByIdAndDelete(id);
    await Review.deleteMany({ serviceProviderId: id });

    res.status(200).json({ msg: "Service provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//search by service
export const SearchServiceProvider_byservice = async (req, res) => {
  try {
    const { query } = req.body;
    const filter = {
      $or: [
        {
          servicename: { $regex: `\\b${query}\\b`, $options: "i" },

          // for exact term finding
        },
        // {
        //   spcity: { $regex: query, $options: "i" },

        // },
      ],
    };
    const filterData = await Provider.find(filter);
    if (filterData.length === 0) {
      res.status(404).json({ msg: "Data not found" });
    }
    res.status(200).json(filterData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//query in api url
export const getServiceProviderByServiceName = async (req, res) => {
  try {
    const { serviceName } = req.params;
    const serviceProvider = await Provider.find({
      spservicename: serviceName,
    });

    if (!serviceProvider) {
      return res
        .status(404)
        .json({ msg: `Service provider for service ${serviceName} not found` });
    }

    res.status(200).json(serviceProvider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// localhost:8000/api/service-provider/getallquery/carpenter

// export const addReviewToServiceProvider = async (req, res) => {
//   try {
//     const serviceProviderId = req.params.id;

//     const serviceProvider = await ServiceProvider.findById(serviceProviderId);
//     if (!serviceProvider) {
//       return res.status(404).json({ msg: "Service provider not found" });
//     }
//     const reviewData = req.body;
//     const userId = new mongoose.Types.ObjectId(reviewData.userId); // Convert userId to ObjectId
//     // console.log("Received review data:", reviewData); // Add this line

//     const review = new Review({ ...reviewData, serviceProviderId });
//     const savedReview = await review.save();

//     const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
//       serviceProviderId,
//       { $push: { reviews: savedReview._id } },
//       { new: true }
//     );

//     // console.log("Updated serviceProvider data:", serviceProvider); // Add this line

//     res.status(200).json(savedReview);
//   } catch (error) {
//     // console.error("Error in addReviewToServiceProvider:", error); // Add this line
//     res.status(500).json({ error: error.message });
//   }
// };

export const addReviewToServiceProvider = async (req, res) => {
  try {
    const serviceProviderId = req.params.id;
    const userId = req.body.userId;

    // Check if the user has already given a review to this service provider
    const existingReview = await Review.findOne({
      serviceProviderId,
      userId,
    });

    if (existingReview) {
      return res.status(400).json({
        msg: "User has already given a review to this service provider",
      });
    }

    const serviceProvider = await Provider.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ msg: "Service provider not found" });
    }

    const reviewData = req.body;

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const review = new Review({
      ...reviewData,
      serviceProviderId,
      userId: userObjectId,
    });
    const savedReview = await review.save();

    const updatedServiceProvider = await Provider.findByIdAndUpdate(
      serviceProviderId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// POST localhost:8000/api/service-provider/SP_ID/reviews

// {
//   "userId": "USER_ID",
//   "rating": 5,
//   "comment": "Great service!"
// }

export const getReviewsByServiceProviderAndUser = async (req, res) => {
  try {
    const { serviceProviderId, userId } = req.params;

    // Ensure that the service provider and user exist
    const serviceProvider = await Provider.findById(serviceProviderId);
    const user = await User.findById(userId);

    if (!serviceProvider || !user) {
      return res
        .status(404)
        .json({ msg: "Service provider or user not found" });
    }

    // Retrieve reviews for the specified service provider
    const reviews = await Review.find({ serviceProviderId })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .populate({
        path: "userId",
        select: "name mobile",
      });

    // Separate reviews by the specified user and other users
    const userReviews = [];
    const otherUserReviews = [];

    reviews.forEach((review) => {
      if (review.userId._id.toString() === userId) {
        userReviews.unshift(review); // Add user's reviews to the beginning of the array
      } else {
        otherUserReviews.push(review); // Add other users' reviews to the end of the array
      }
    });

    // Combine user reviews and other user reviews
    const combinedReviews = userReviews.concat(otherUserReviews);

    res.status(200).json(combinedReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//GET http://localhost:8000/api/service-provider/SP_ID/reviews/USER_ID
