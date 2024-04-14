import express from "express";
import {
  giveReview,
  getReviews,
  getRatings,
  getReviewswithspecificuser,
  getRatingReviewofuser,
  checkreview,
  updateReview,
  getReviewId,
  countReviews,
} from "../controller/reviewController.js";

const route = express.Router();

route.post("/:id", giveReview);
route.get("/getreviews/:id", getReviews);
route.get("/getratings/:id", getRatings);
route.get("/getratingscount/:id", countReviews);

route.get("/getReviewId/:userId/:providerId", getReviewId);
route.post("/getReviewswithspecificuser/:id", getReviewswithspecificuser);
route.get("/:providerId/:userId", getRatingReviewofuser);
route.get("/check/:providerId/:userId", checkreview);
route.put("/update/:reviewId", updateReview);

export default route;
