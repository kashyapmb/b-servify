import express from "express";
import {
  saveSearch,
  clearAllSearches,
  getAllSearches,
  deleteSearch,
} from "../controller/serchuserController.js";

const route = express.Router();

route.post("/saveSearch", saveSearch);
route.post("/clearall", clearAllSearches);
route.post("/getallSearch", getAllSearches);
route.post("/deleteSearch", deleteSearch);

export default route;
