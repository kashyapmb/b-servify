import express from "express";
import {
  createServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
  getOneServiceProvider,
  updateServiceProvider,
  SearchServiceProvider_byservice,
  addReviewToServiceProvider,
  getServiceProviderByServiceName,
  getReviewsByServiceProviderAndUser,
  signIn,
  searchByEmail,
  updatePassword,
  getServiceProviders,
  updateProviderDetails,
  mobileVerified,
  emailVerified,
  temp,
} from "../controller/providerContoller.js";
import {
  getAllServiceProvidersAlgo,
  getAllServiceProvidersRating,
} from "../controller/monitizationalgoController.js";
const route = express.Router();

route.get("/temp", temp);

route.post("/create", createServiceProvider);
route.post("/updatepassword", updatePassword);
route.get("/search/:email", searchByEmail);
route.post("/getproviders", getServiceProviders);
route.get("/getone/:id", getOneServiceProvider);
route.put("/updateDetails/:id", updateProviderDetails);
route.put("/mobileVerified/:id", mobileVerified);
route.put("/emailVerified/:id", emailVerified);
route.get("/getall", getAllServiceProviders);

route.put("/update/:id", updateServiceProvider);
route.post("/signin", signIn);
route.delete("/delete/:id", deleteServiceProvider);
route.post("/search", SearchServiceProvider_byservice);
route.get("/getallquery/:serviceName", getServiceProviderByServiceName);
route.post("/:id/reviews", addReviewToServiceProvider);
route.get(
  "/:serviceProviderId/reviews/:userId",
  getReviewsByServiceProviderAndUser
);

route.post("/getprovidersalgo", getAllServiceProvidersAlgo);
route.post("/getprovidersRating", getAllServiceProvidersRating);

export default route;
