import express from "express";
import {
  create,
  deleteUser,
  getAll,
  getOne,
  update,
  login,
  logout,
  updatewithlogintoken,
  searchByEmail,
  updatePassword,
  updateUserDetails,
} from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addFavorite,
  getFavorites,
  isFavorite,
  removeFavorite,
} from "../controller/favoriteController.js";
const route = express.Router();

route.post("/addfavorite", addFavorite);
route.post("/removefavorite", removeFavorite);
route.post("/isfavorite", isFavorite);
route.post("/getfavorites", getFavorites);

export default route;
