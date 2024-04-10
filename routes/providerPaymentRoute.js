import express from "express";
import {
  dopayment,
  checkpaymentstatus,
  dopaymentplan,
  givepaymentinfo,
} from "../controller/paymentproviderController.js";

const route = express.Router();

route.get("/:providerId", dopayment);
route.post("/paymentplan/:providerId", dopaymentplan);
route.get("/checkpaymentstatus/:providerId", checkpaymentstatus);
route.get("/getpaymentinfo/:providerId", givepaymentinfo);

export default route;
