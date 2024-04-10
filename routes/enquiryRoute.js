import express from "express";
import {
  create_enquiry,
  check_estatus,
  cancelEnquiry,
  fetchEnquiryUser,
  fetchcanceledenquiriesUser,
  fetchdeclineenquiriesUser,
  fetchdoneenquiriesUser,
  checkcancellation,
} from "../controller/userenquiryContoller.js";

import {
  declineEnquiry,
  enquiryDone,
  fetchEnquiry,
  fetchcancelEnquiry,
  fetchdeclineEnquiry,
  fetchdoneEnquiry,
  getOneEnquiry,
} from "../controller/providerenquiryController.js";
const route = express.Router();

route.post("/createenquiry", create_enquiry);
route.post("/checkestatus", check_estatus);
route.get("/fetchcanceledenquiry/:userId", fetchcanceledenquiriesUser);
route.get("/fetchenquiryuser/:userId", fetchEnquiryUser);
route.get("/fetchdoneenquiryuser/:userId", fetchdoneenquiriesUser);
route.get("/fetchdeclineenquiryuser/:userId", fetchdeclineenquiriesUser);
route.get("/fetchenquiryuser/:userId", fetchEnquiryUser);
route.put("/cancelenquiry/:enquiryId", cancelEnquiry);
route.get("/checkcancellation/:enquiryId", checkcancellation);

route.get("/fetchenquiry/:providerId", fetchEnquiry);
route.get("/fetchdoneenquiry/:providerId", fetchdoneEnquiry);
route.get("/fetchdeclineenquiry/:providerId", fetchdeclineEnquiry);
route.get("/fetchcancelenquiry/:providerId", fetchcancelEnquiry);
route.get("/fetchenquiry/:providerId", fetchEnquiry);
route.put("/declineenquiry/:enquiryId", declineEnquiry);
route.put("/enquirydone/:enquiryId", enquiryDone);

route.get("/getenquirydetail/:id", getOneEnquiry);

export default route;
