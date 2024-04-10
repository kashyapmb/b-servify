import Review from "../model/reviewModel.js";
import Provider from "../model/providerModel.js";
import User from "../model/userModel.js";
import mongoose from "mongoose";

export const giveReview = async (req, res) => {
  try {
    const providerId = req.params.id;
    const { userId, rating, review } = req.body;
    const existingReview = await Review.findOne({
      ProviderId: providerId,
      userId: userId,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "User has already reviewed this service provider",
      });
    }

    // Create a new review
    const newReview = await Review.create({
      ProviderId: providerId,
      userId: userId,
      review: review,
      rating: rating,
    });

    // Update the provider's reviews array
    await Provider.findByIdAndUpdate(
      providerId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    const existingRatings = await Review.find({ ProviderId: providerId });
    const totalRating = existingRatings.reduce(
      (sum, rating) => sum + rating.rating,
      newReview.rating
    );
    const newOverallRating =
      Math.round((totalRating / (existingRatings.length + 1)) * 2) / 2;
    await Provider.findByIdAndUpdate(
      providerId,
      { $set: { overallRating: newOverallRating } },
      { new: true }
    );

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// post localhost:8000/api/reviews/PROVIDER_ID
// {
//   "userId": "USER_ID",
//   "rating": 5,
//   "review": "Great service!"
// }

export const getReviews = async (req, res) => {
  try {
    const providerId = req.params.id;

    // Fetch reviews for the provider with user details populated
    const reviews = await Review.find({ ProviderId: providerId }).populate({
      path: "userId",
      model: User,
      select: "fname lname profilePhoto",
    });

    // Format the response
    const formattedReviews = reviews.map((review) => ({
      userId: review.userId._id,
      fname: review.userId.fname,
      lname: review.userId.lname,
      profileimg: review.userId.profilePhoto,
      createdAt: review.created,
      review: review.review,
      rating: review.rating,
    }));

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
//get localhost:8000/api/reviews/getreviews/PROVIDER_ID

//given user is top on reviews
export const getReviewswithspecificuser = async (req, res) => {
  try {
    const providerId = req.params.id;
    const { userId } = req.body;

    // Ensure that the service provider and user exist
    const serviceProvider = await Provider.findById(providerId);
    const user = await User.findById(userId);

    if (!serviceProvider || !user) {
      return res
        .status(404)
        .json({ msg: "Service provider or user not found" });
    }

    // Retrieve reviews for the specified service provider
    const reviews = await Review.find({ ProviderId: providerId })
      .sort({ rating: -1 }) // Sort by creation date in descending order
      .populate({
        path: "userId",
        model: User,
        select: "fname lname profilePhoto",
      });

    const formattedReviews = reviews.map((review) => ({
      userId: review.userId._id,
      fname: review.userId.fname,
      lname: review.userId.lname,
      profileimg: review.userId.profilePhoto,
      createdAt: review.created,
      review: review.review,
      rating: review.rating,
    }));

    // Separate reviews by the specified user and other users
    const userReviews = [];
    const otherUserReviews = [];

    formattedReviews.forEach((review) => {
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

//post localhost:8000/api/reviews/getReviewswithspecificuser/PROVIDER_ID
// {
// 	"userId": "65e2c4cb091d5cb82ebf8df6"
// }

export const getRatingReviewofuser = async (req, res) => {
  try {
    const { providerId, userId } = req.params;

    // Find reviews based on providerId and userId
    const userReviews = await Review.findOne({
      ProviderId: providerId,
      userId: userId,
    }).select("review rating created");
    if (!userReviews) {
      return res.status(404).json({ message: "User hasn't reviewed yet" });
    }
    res.json(userReviews);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
//get localhost:8000/api/reviews/PROVIDER_ID/USER_ID

//check give review or not
export const checkreview = async (req, res) => {
  try {
    const { providerId, userId } = req.params;

    // Find reviews based on providerId and userId
    const userReviews = await Review.findOne({
      ProviderId: providerId,
      userId: userId,
    });
    if (!userReviews) {
      res.json("not Reviewed");
    } else {
      res.json("Reviewed");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
//get localhost:8000/api/reviews/check/PROVIDER_ID/USER_ID

export const getReviewId = async (req, res) => {
  try {
    const { userId, providerId } = req.params;

    // Find the review based on userId and providerId
    const review = await Review.findOne({
      userId: userId,
      ProviderId: providerId,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found for the specified user and provider",
      });
    }

    res.status(200).json({
      reviewId: review._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
//localhost:8000/api/reviews/getReviewId/USER_ID/PROVIDER_ID

export const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const { rating, review } = req.body;

    // Find the existing review based on the reviewId
    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Update the review and rating
    existingReview.rating = rating;
    existingReview.review = review;

    // Save the updated review
    await existingReview.save();

    // Update overall rating for the associated provider
    const providerId = existingReview.ProviderId;
    const existingRatings = await Review.find({ ProviderId: providerId });
    const totalRating = existingRatings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    const newOverallRating =
      Math.round((totalRating / existingRatings.length) * 2) / 2;
    await Provider.findByIdAndUpdate(
      providerId,
      { $set: { overallRating: newOverallRating } },
      { new: true }
    );

    res.status(200).json({
      message: "Review updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
// put localhost:8000/api/reviews/update/65e744b1e64f017dd3d50ac5
// {
//   "rating": 2,
//   "review": "Updated review text"
// }

export const getRatings = async (req, res) => {
  try {
    const providerId = req.params.id;

    // Fetch reviews for the provider with user details populated
    // const reviews = await Review.find({ ProviderId: providerId })

    const allReviews = await Review.find({ ProviderId: providerId });

    // Initialize an array to store the result
    const ratingDistribution = [];

    // Loop through ratings (from 5 to 1) and calculate completed and total values
    for (let rating = 5; rating >= 1; rating--) {
      const completed = allReviews.filter(
        (review) => review.rating === rating
      ).length;

      const total = allReviews.length;

      // Add the result to the array
      ratingDistribution.push({ rating, completed, total });
    }

    res.status(200).json(ratingDistribution);
    // Format the response
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
//get localhost:8000/api/reviews/getratings/PROVIDER_ID
