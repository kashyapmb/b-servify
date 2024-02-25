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
} from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const route = express.Router();

route.post("/create", create);
route.post("/login", login);
route.get("/getall", getAll);
route.get("/search/:email", searchByEmail);
route.post("/updatepassword", updatePassword);


route.get("/logout", logout);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.put("/updatewithlogintoken/:id", authMiddleware, updatewithlogintoken);
route.delete("/delete/:id", deleteUser);

export default route;
