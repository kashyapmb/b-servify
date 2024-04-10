import express from "express";
import {
  countEnquiry,
  countMonthlyEnquiry,
} from "../controller/dashboarddetailController.js";

const route = express.Router();

route.get("/dashboard/:providerId", countEnquiry);
route.get("/monthlycount/:providerId", countMonthlyEnquiry);

export default route;
