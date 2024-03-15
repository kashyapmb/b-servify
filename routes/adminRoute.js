import express from "express";
import {
  createReview,
  getReviewsByServiceProvider,
} from "../controller/reviewController.js";
import { getAllProviderEditedData, getAllUserEditedData, providerEditedData, userEditedData } from "../controller/adminController.js";

const route = express.Router();

route.post("/userediteddata", userEditedData);
route.get("/getAllUserEditedData", getAllUserEditedData);
route.post("/providerediteddata", providerEditedData);
route.get("/getAllProviderEditedData", getAllProviderEditedData);

export default route;