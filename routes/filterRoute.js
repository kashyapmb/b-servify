import express from "express";
import {
  filterDoneEnquiry,
  filterEnquiry,
  filterCancelEnquiry,
  filterDeclineEnquiry,
} from "../controller/providerfilterenquiryController.js";

import {
  filterDoneEnquiryUser,
  filterEnquiryUser,
  filterCancelEnquiryUser,
  filterDeclineEnquiryUser,
} from "../controller/userfilterenquiryController.js";

const route = express.Router();

route.post("/filterdone/:providerId", filterDoneEnquiry);
route.post("/filterenquiry/:providerId", filterEnquiry);
route.post("/filterdecline/:providerId", filterDeclineEnquiry);
route.post("/filtercancel/:providerId", filterCancelEnquiry);

route.post("/filterdoneuser/:userId", filterDoneEnquiryUser);
route.post("/filterenquiryuser/:userId", filterEnquiryUser);
route.post("/filterdeclineuser/:userId", filterDeclineEnquiryUser);
route.post("/filtercanceluser/:userId", filterCancelEnquiryUser);
export default route;
